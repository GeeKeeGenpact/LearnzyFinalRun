const express = require('express')
const Prospect = require('../models/prospectModel')
const{createProspect, getProspects, updateProspect, getProspect} = require('../controllers/prospectController')

const router=express.Router()

router.get('/', getProspects)
router.get('/:id', getProspect)
router.post('/', createProspect)
router.patch('/:id', updateProspect)

module.exports=router