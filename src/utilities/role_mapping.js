const phase_1 = "1021000781463289947";
const phase_2 = "1021000939299164210";
const phase_3 = "1021001016646324235";
const phase_4 = "1021001087127392327";
const phase_5 = "1021001343181266954";
const phase_6 = "1021001417009401856";

const new_member = "1076130239849169048";

const next = (role) => {
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
  const roles = [phase_1, phase_2, phase_3, phase_4, phase_5, phase_6];

  return roles.includes(role);
};

const is_new_member = (role) => {
  return new_member === role;
};

const has_new_member_role = (roles) => {
  return roles.includes(new_member);
};

const role_id_map = (id) => {
  const roles = new Map();
  roles.set(1, phase_1);
  roles.set(2, phase_2);
  roles.set(3, phase_3);
  roles.set(4, phase_4);
  roles.set(5, phase_5);
  roles.set(6, phase_6);

  if (!roles.has(id)) {
    throw new Error(`No journey stage found for ${id}`);
  }

  return roles.get(id);
};

const role_mapping = {
  next,
  has_role,
  is_new_member,
  has_new_member_role,
  role_id_map,
  new_member,
};

export default role_mapping;
