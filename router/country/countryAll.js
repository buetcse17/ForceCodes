// libraries
const express = require('express');

const countryRouter = require('./country/country');
const DB_global = require(process.env.ROOT + '/DB-codes/DB-global-api');

const router = express.Router({mergeParams : true});

router.get('/', async (req, res) =>{
    let cntryList = await DB_global.getAllCountriesSorted();

    for(let i = 0; i<cntryList.length; i++){
        cntryList[i].URL = `/country/${cntryList[i].NAME.replace(' ', '_')}`;
    }

    let innerNav = [
        {url : '/country', name : 'COUNTRIES'}
    ];
    res.render('layout.ejs', {
        title: 'Countries - ForceCodes',
        body: ['panel-view', 'globalList', 'COUNTRIES'],
        user: req.user,
        innerNav: innerNav,
        listHeader: 'All Countries',
        list : cntryList
    });
});

router.use('/:country', countryRouter);

module.exports = router;