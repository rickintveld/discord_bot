const next = (role) => {
  const phase_1 = "1021000781463289947";
  const phase_2 = "1021000939299164210";
  const phase_3 = "1021001016646324235";
  const phase_4 = "1021001087127392327";
  const phase_5 = "1021001343181266954";
  const phase_6 = "1021001417009401856";

  if (role === phase_6) {
    throw new Error("Can not upgrade this role");
  }

  switch (role) {
    case phase_1:
      return phase_2;
    case phase_2:
      return phase_3;
    case phase_3:
      return phase_4;
    case phase_4:
      return phase_5;
    case phase_5:
      return phase_6;

    default:
      return phase_1;
  }
};

const has_role = (role) => {
  const roles = [
    "1021000781463289947", // phase 1
    "1021000939299164210", // phase 2
    "1021001016646324235", // phase 3
    "1021001087127392327", // phase 4
    "1021001343181266954", // phase 5
    "1021001417009401856", // phase 6
  ];

  return roles.includes(role);
};

const role_mapping = { next, has_role };

export default role_mapping;
