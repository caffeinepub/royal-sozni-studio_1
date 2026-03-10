import AccessControl "./authorization/access-control";
import MixinAuthorization "./authorization/MixinAuthorization";

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();

  // Include authorization mixin
  include MixinAuthorization(accessControlState);
};
