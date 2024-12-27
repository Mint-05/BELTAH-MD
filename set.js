const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU5qanp2bkVqZm9EYnIrRSt2WnJWNC80VXBGVm1Gc3RDK05UYmdoRDhITT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHo3NUZNQmZHY1hLRFVQOFNyUDY2U2k1YUhEdUdiMEo4NHJQRWdZRHkyYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTWt6dHloS2pJeUZ2UWRhSjJJV1lXSERGUm9XMUVEOTh4WmczKytHTkZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjbldEbmQwUSt6U3NNUWM5d3l0b2NEWnZ0NEF2NjY0WWQ1OCtKQW40RWxrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9GZjN2Z2ZxT21PREZuVC9LdDNyRnc1RVcwVHhkd1htREIvYzRvUnlVV3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRNQ0NPWlFLUTFidlphckd4Q25NYWZhUVJWRGNjOElCS1o2MEQzZFpCR1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0oyd01ILzZCSGxyME90UkdoeDllSy9kNjBLN1laYml1aWQ4WSt5STZXaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVmd0RHhIVm1DZGJOSGw3S0tsS3hwQjRoajJwN3NHRHg5UHR2d3JwalhCUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlxQ3oyMHJwTmVkOTJrRDQrdGt4QWs0YVR2dVc1YW1sQ2NLRkM3ZGtuMkRJSjB1YlRSMk1UbzNmTHdtTzh4N1VuWGJKRS9Sb2lCelNDWE9SdVZBeUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTMsImFkdlNlY3JldEtleSI6IkRIZldCTzVzeFovRnBYTW9sK2VjcTFkSmVYOFFBSnkxR2tyK296cUlKSDQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjlpOTNGUWhFU01HcWdna3phVWFsb2ciLCJwaG9uZUlkIjoiZjcwNTQxODgtMDI3Ni00ZTA2LWE0YmEtMzc1YTViYTc4MDdhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdZU0IvZnZtTHBQaFR6NGlLYWdaMzE2TkRFTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmMnBrQnR3VzFWbGJ2djVLUDlzRGhkbUtwV3c9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMTZZUUdFNUQiLCJtZSI6eyJpZCI6IjI1NDczMTAwNDI1MDozOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJIbW0ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01lbnRKd0JFS1dJdTdzR0dCOGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjAybnNsazRhWmh6REk2UDl0TDFieEFMNjJFODc4dDVCOURVaXQ2b20yQ1E9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjFONHNVMEZ4dDFMKzJBTWxYUkZHTjNzR3VENmxWU3lUSjFiK212d1U3V1VoK2xRdGFsdklETGZBSUlBVi9HU2NCeit0Si9hZ3l2OG45YmdCWEliRkNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJOUXpJM0t0cmg0TVo1SCtPZjcrTlN4ZEpTY2pzZDlUQTRUU1d3Nmx0MExNU1J2N0VlM05YbXMvUnNCSEd5VTBlUTQwVkppVWZ1VDAzZERoTTRPQ1hCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDczMTAwNDI1MDozOEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkTnA3SlpPR21ZY3d5T2ovYlM5VzhRQyt0aFBPL0xlUWZRMUlyZXFKdGdrIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM1MzEyNDM0fQ==',
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
