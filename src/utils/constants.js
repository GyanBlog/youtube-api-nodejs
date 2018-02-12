/**
 * Created by gsingal on 6/23/17.
 */

const UserType = {
    EMAIL_SUBSCRIBER: 'EMAIL_SUBSCRIBER',
    EMAIL_REGISTERED: 'EMAIL_REGISTERED',
    EMAIL_DOWNLOADED_DRAWINGS: 'EMAIL_DOWNLOADED_DRAWINGS',
    EMAIL_BOUGHT_SUBSCRIPTION: 'EMAIL_BOUGHT_SUBSCRIPTION',

    EMAIL_TEST: 'EMAIL_TEST',

    //negative
    EMAIL_UNSUBSCRIBER: 'EMAIL_UNSUBSCRIBER',
    EMAIL_COMPLAINT: 'EMAIL_COMPLAINT',
    EMAIL_BOUNCE: 'EMAIL_BOUNCE',
    EMAIL_SPAM: 'EMAIL_SPAM',
};

const SES_NotificationType = {
    Complaint: 'Complaint',
    Bounce: 'Bounce'
};

const Events = {
    SEND_MAIL: 'SendMail',
    ADD_MESSAGE: 'AddMessage',
    STOP_CONSUMERS: 'STOP_CONSUMERS',
    START_CONSUMERS: 'START_CONSUMERS',
};

module.exports = {
    SES_NotificationType: SES_NotificationType,

    UserType: UserType,

    Events: Events
};
