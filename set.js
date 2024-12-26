const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'BELTAH-MD;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUpTVWlUaURtR1ZCdFMrc0F0VjBLSU1hRENTWlk2UDZrS2VLNXlaOFpudz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVVxR0RxaFlEajYxTENqWFVHaFNEajJ1MXBNVy9pdk1BeXo4d0c4R2VVVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2SHNPV2E1UWlQVWtLK0l3MFVUTS9oTVlMc1hkZS9sUmJpMUxCNWMyVEhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZZERFZWtBd3p5bGV5NXBZUXJkTVh1c2NickZQbEtzS3JJMHNYZ0ExUzNZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVGaTNGRVZwY0M0UUhUMUxLWm9RM1dvWFhJNlpUbmQrdnVzaDFkdzR2V2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVhV202M25KbFprVFo0V1JFMGZoakFIeWoxc0lrWk05QmlJUkwxMTlpVGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU1iRElmTkNibHZ2VS81NmZDb2hFVlhlVHFVN0JyMVdHQy9HV1BYMCtHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicmtXY2dhT0lDNVVCRkUvZWIvS3lHOXVZYWZkeHRCRXc2aFU5TDIyN2lDOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlAxeFNXdlV4di9nSHBzYnZDR0N0c1BFUHVPRy9KVExxSVRRZWYxYlAxcDY4NXJXbk94b2E0TGkrOHRhMEt5eGw2K2dEZEl1c05TVHFTaDYycGhsWmp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjYsImFkdlNlY3JldEtleSI6Ik5NbEJQWWRlNUZleE9hT0EvUlE3Y09IVDMwc2EyTjhYbll5QWVuOFZmYm89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImVZM21sVUR4VC1TOEJWOVJaRjRzVWciLCJwaG9uZUlkIjoiOTFiOGJlMjUtNzI0Zi00OGFkLWFiZTYtY2EyYjAwYWI2NmEzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJBSlhpSi91N1ZhdFc4K05lOHRMcmpNbmFMUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkTmtqSisvV0Y3aE5qRVhYdDladHVWQVJJY0U9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUjlUS0hOUUEiLCJtZSI6eyJpZCI6IjI1NDczMTAwNDI1MDozNEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJIbW0ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01lbnRKd0JFUEwyc3JzR0dCZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjAybnNsazRhWmh6REk2UDl0TDFieEFMNjJFODc4dDVCOURVaXQ2b20yQ1E9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBUaElsa3BKQXFkM0x6VDY2WTBLdjJqZnNISmdjUjVDYmJkTVpxaXhwK2xDb1dGdDQ4aWtyUHRzaEQ2ZzVYanYzeTE1MDJmZkdNSldIWm5naDRzOEJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ1K00vanpGUEVQM3dDbHl2eHFaM254ci9lUjNFQ2FMS3ZqTHp0bXYrMU1UTTM0Wm5wcHplRm1Zay9hVU9yR04vaExKODVOUkQ5ZXZMQ3ppM3k5d0RnQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDczMTAwNDI1MDozNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkTnA3SlpPR21ZY3d5T2ovYlM5VzhRQyt0aFBPL0xlUWZRMUlyZXFKdGdrIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM1MTc5MTM1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9vaSJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Huaweike/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Mint",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254731004250",
    ANTICALL: process.env.ANTICALL || "non",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ BELTAH-MD",
    BOT : process.env.BOT_NAME || 'BELTAH-MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
