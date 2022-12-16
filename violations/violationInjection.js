import retailViolation from "./retailViolation.js";
import setupViolation from "./setupViolation.js";

const violationInjection = async (client) => {
  retailViolation(client);
  setupViolation(client);
};

export default violationInjection;
