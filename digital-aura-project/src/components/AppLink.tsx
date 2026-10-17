import { Link, type LinkProps } from "react-router-dom";

// These pages are served by separate apps (nginx routes them), so client-side navigation would land on the SPA 404.
const SEPARATE_APP = /^\/(seo-services-ahmedabad|google-ads-agency-ahmedabad|digital-marketing-company-ahmedabad)(?=\/|#|\?|$)/;

/** Link that does a normal page load for pillar pages that live outside this React app, and client-side routing for everything else. */
export const AppLink = (props: LinkProps) => {
  const { to } = props;
  if (typeof to === "string" && SEPARATE_APP.test(to)) {
    const { to: _to, replace: _replace, state: _state, reloadDocument: _reload, preventScrollReset: _reset, relative: _relative, ...anchor } = props;
    return <a href={to} {...(anchor as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <Link {...props} />;
};
