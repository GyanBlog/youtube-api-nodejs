
const UserType = require('./constants').UserType;

class Utils {
    /**
     * Is user already in bounced/complaint list
     */
    static isUsertypeNegative(type) {
        switch(type) {
            //only having negative types
            case UserType.EMAIL_BOUNCE:
            case UserType.EMAIL_COMPLAINT:
            case UserType.EMAIL_UNSUBSCRIBER:
            case UserType.EMAIL_SPAM:
                return true;
        }

        return false;
    }
}

module.exports = Utils;