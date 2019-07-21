const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util')
const credential = require('./googleSheetsServiceAccount.json')
require("dotenv").config();

const _memberSpreadsheetKey = process.env.MEMBERS_SPREADSHEET_KEY || '1OphsELMoLCAySDgOx5vH2YPrC_Uk1Ni2d1-VPpjz_hc'

/// A class to interface with Google Sheets api
class GoogleSheetsService {
    constructor() {
        this._doc = {};
        this._info = {};
        this._memberSheet = {};
    }

    /// Run this method before doing anything else
    async initialize() {
        console.log('start initialize')
        this._doc = new GoogleSpreadsheet(_memberSpreadsheetKey);
        await promisify(this._doc.useServiceAccountAuth)(credential);
        this._info = await promisify(this._doc.getInfo)();
        this._memberSheet = this._info.worksheets.find(
            sheet => sheet.title = "Members")
        console.log('init done')
    }

    async getAllMembers() {
        try {
            const members = []
            const rows = await promisify(this._memberSheet.getRows)();
            rows.forEach(row => members.push(Member(row)))
            return members;
        } catch (e) {
            throw new Error("Service was not initialized")
        }
    }
}

/// A Factory Function to create Member object
const Member = (data) => {
    return {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        newsletterSubscribed: data.newslettersubscribed === "TRUE" ? true : false,
        isEboard: data.iseboard === "TRUE" ? true : false,
        description: data.description,
    }
}

module.exports = GoogleSheetsService;
