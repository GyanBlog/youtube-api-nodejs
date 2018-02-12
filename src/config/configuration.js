const convict = require('convict');

//Define configuration schema
const conf = convict({
    self: {
        port: {
            doc: 'Port for hosting API server',
            format: 'port',
            default: 3000,
            env: 'APP_PORT'
        },
        hostname: {
            doc: 'The hostname to use for the application',
            format: String,
            default: 'localhost',
            env: 'APP_HOSTNAME'
        },
        secure: {
            doc: 'Whether to use HTTPS or HTTP',
            format: Boolean,
            default: false,
            env: 'APP_SECURE'
        }
    },
    database: {
        mongo: {
            connection: {
                doc: 'The configuration string to connect and work with mongo database connection',
                format: String,
                default: 'mongodb://127.0.0.1/gyanmail?' +
                'pool=100&' +
                'readPreference=nearest&' +
                'readConcern=majority',
                env: 'DB_MONGO_ADDR'
            },
            useAlternate: {
                doc: 'if true, read db host/port from env',
                format: Boolean,
                default: false
            },
            hostnameEnvVar: {
                doc: 'Env var name for hostname',
                format: String,
                default: 'MONGO_PORT_27017_TCP_ADDR'
            },
            portEnvVar: {
                doc: 'Env var name for port',
                format: String,
                default: 'MONGO_PORT_27017_TCP_PORT'
            },
            dbName: {
                doc: 'Name of db',
                format: String,
                default: 'gyanmail'
            },
        }
    },
    filePath: {
        baseDir: {
            doc: 'Base Directory where files resides',
            format: String,
            default: 'files'
        },
        imagesFolder: {
            doc: 'Path of folder where images will be placed',
            format: String,
            default: 'public/images'
        },
        templatesFolder: {
            doc: 'Path of folder where templates will be placed',
            format: String,
            default: 'templates'
        },
        newsletterFolder: {
            doc: 'Path of folder where prepared newsletter will be placed',
            format: String,
            default: 'public/newsletter'
        },
        logsFolder: {
            doc: 'Logs folder path',
            format: String,
            default: '.'
        },
    },
    email: {
        from: {
            doc: 'Email id of from recipient',
            format: String,
            default: 'Planndesign Info<info@planndesign.com>'
        },
        mailAsyncLimit: {
            doc: 'Async limit of sending mails',
            format: Number,
            default: 1
        },
        repeatNewsletterGapMinHours: {
            doc: 'Minimum time gap in hours between consecutive newsletter email sent',
            format: Number,
            default: 24
        }
    },
    image: {
        thumbnail: {
            midSize: {
                width: {
                    doc: 'width of image',
                    format: Number,
                    default: 266
                },
                height: {
                    doc: 'height of image',
                    format: Number,
                    default: 199
                }
            }
        },
        logoPnd: {
            url: {
                doc: 'URL of pnd logo',
                format: String,
                default: 'https://www.planndesign.com/sites/all/themes/planndesign3/images/logo.png'
            },
            path: {
                doc: 'local path of pnd logo',
                format: String,
                default: '/public/images/static/pnd_logo.png'
            },
            cid: {
                doc: 'cid value of pnd logo',
                format: String,
                default: 'emailTemplateLogoImage.lLaAjJkKlLll'
            }
        }
    },
    awsSQS: {
        accessKey: {
            doc: 'Access Key for AWS SQS account',
            format: String,
            default: '',
            env: 'AWS_SQS_ACCESS_KEY'
        },
        secretKey: {
            doc: 'Secret Key for AWS SQS account',
            format: String,
            default: '',
            env: 'AWS_SQS_SECRET_KEY'
        },
        region: {
            doc: 'Region name',
            format: String,
            default: 'us-east-1',
            env: 'AWS_SQS_REGION'
        },
        queueUrl: {
            doc: 'Queue URL',
            format: String,
            default: 'https://sqs.us-east-1.amazonaws.com/686302582657/pnd-emails-negative',
            env: 'AWS_SQS_QUEUE_URL'
        }
    },
    awsSES: {
        accessKey: {
            doc: 'Access Key for AWS SQS account',
            format: String,
            default: '',
            env: 'AWS_SQS_ACCESS_KEY'
        },
        secretKey: {
            doc: 'Secret Key for AWS SQS account',
            format: String,
            default: '',
            env: 'AWS_SQS_SECRET_KEY'
        },
        region: {
            doc: 'Region name',
            format: String,
            default: 'us-east-1',
            env: 'AWS_SQS_REGION'
        }
    },
    queue: {
        rabbitmq: {
            host: {
                doc: 'The ip or name of the rabbitmq host',
                format: String,
                default: '127.0.0.1',
                env: 'GYAN_MAIL_RABBITMQ_HOST'
            },
            protocol: {
                doc: 'The protocol to use for connection to rabbitmq queue',
                format: ['amqp', 'amqps'],
                default: 'amqp'
            },
            port: {
                doc: 'The port on which rabbitmq is listening on.',
                format: 'port',
                default: 5672
            },
            username: {
                doc: 'The user name for the account logging in',
                format: function check(val) {
                    if (!/^[a-fA-F0-9]*/.test(val)) {
                        throw new Error('must be an alpha numeric use name.');
                    }
                },
                default: 'guest'
            },
            password: {
                doc: 'The credentials for the account logging in',
                format: function check(val) {
                    if (!/^[a-fA-F0-9]*/.test(val)) {
                        throw new Error('must be an alpha numeric password only.');
                    }
                },
                default: 'guest'
            },
            numConsumers: {
                doc: 'Parallel number of consumers',
                format: Number,
                default: 1
            },
        },
        retry: {
            factor: {
                doc: 'The task retry exponential back-off factor, the default being 1.2',
                format: Number,
                default: 1.0
            },
            initialWait: {
                doc: 'The initial waiting period in milliseconds, 5 seconds being the default',
                format: 'int',
                default: 5000
            },
            maximumWait: {
                doc: 'The maximum default period after which the task will be rejected. The default is to never reject a task.',
                format: 'int',
                default: -1
            },
            randomizeBy: {
                doc: 'Optionally we can randomize the offset by a value causing not all items to not expire simultaneously',
                format: 'int',
                default: 2000
            },
            maxRetries: {
                doc: 'Maximum number of retires allowed for an task.',
                format: 'int',
                default: -1
            },
            maximumWaitCeil: {
                doc: 'The maximum ceiling value to increase the maximum retry time by, beyond which this value will not be increased',
                format: 'int',
                default: -1
            }
        }
    },
});

// Load environment dependent configuration if available
if (process.env.APP_CONFIG) {
    conf.loadFile(process.env.APP_CONFIG);
}

// Perform validation
conf.validate({allowed: 'strict'});

module.exports = conf;
