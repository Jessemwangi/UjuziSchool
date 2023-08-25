
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import Icon from "@mui/material/Icon";

function Breadcrumbs({ icon, title, route, light }) {
  const routes = route.slice(0, -1);

  return (
 <>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link to="/">
          <Typography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </Typography>
        </Link>
        {routes.map((el) => (
          <Link to={`/${el}`} key={el}>
            <Typography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el}
            </Typography>
          </Link>
        ))}
        <Typography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {title.replace("-", " ")}
        </Typography>
      </MuiBreadcrumbs>
      <Typography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {title.replace("-", " ")}
      </Typography>
 </>
   
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
