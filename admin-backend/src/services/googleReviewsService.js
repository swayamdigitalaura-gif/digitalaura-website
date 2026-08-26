const crypto = require('crypto');
const { Testimonial } = require('../models');

// Google's Place Details (New) API returns at most 5 reviews per call, and only
// lets you request the "most relevant" or "newest" sort — no pagination for more.
const PLACES_API_BASE = 'https://places.googleapis.com/v1/places';

function reviewDedupeKey(placeId, review) {
  // The API gives no stable review ID, so hash author + text + published time —
  // stable across repeated fetches of the same review, changes if Google ever
  // edits/re-orders the review text.
  const raw = `${placeId}:${review.authorAttribution?.displayName || ''}:${review.publishTime || ''}:${review.text?.text || ''}`;
  return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 64);
}

async function fetchGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) {
    throw new Error('GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID must be set in .env');
  }

  const url = `${PLACES_API_BASE}/${placeId}?fields=reviews&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Places API request failed (${res.status}): ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.reviews || [];
}

// Fetches current reviews from Google, keeps only 5-star ones, and upserts them
// into the shared testimonials table (platform: 'Google') so they render through
// the site's existing Testimonials component with no separate frontend wiring.
// Returns a summary of what changed.
async function refreshGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const reviews = await fetchGoogleReviews();

  const fiveStar = reviews.filter(r => r.rating === 5);

  let created = 0;
  let updated = 0;
  for (const review of fiveStar) {
    const google_review_id = reviewDedupeKey(placeId, review);
    const [row, wasCreated] = await Testimonial.findOrCreate({
      where: { google_review_id },
      defaults: {
        name: review.authorAttribution?.displayName || 'Google User',
        role: '',
        company: '',
        photo: review.authorAttribution?.photoUri || '',
        quote: review.text?.text || review.originalText?.text || '',
        rating: review.rating,
        platform: 'Google',
        is_visible: true,
        order_index: 0,
        testimonial_type: 'text',
        google_review_id,
      },
    });
    if (wasCreated) created += 1;
    else updated += 1;
  }

  return { fetched: reviews.length, fiveStar: fiveStar.length, created, updated };
}

module.exports = { fetchGoogleReviews, refreshGoogleReviews };
