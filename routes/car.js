/**
 * Created by dhira on 11/19/2016.
 */
var express = require('express');
var mysql = require('./../db/mysql');
var ejs=require('ejs');
var logger = require('../helper/logger').getLogger();

exports.getCar = function(req, res){
    var Vehicle_ID = req.query.Vehicle_ID;
    var Manufacturer = req.query.Manufacturer;
    var manufactured_year = req.query.manufactured_year;
    var model_no = req.query.model_no;
    var car_type = req.query.car_type;

    var bool_Vehicle_ID = false;
    var bool_Manufacturer = false;
    var bool_manufactured_year = false;
    var bool_model_no = false;
    var bool_car_type = false;
    var bool_end_check = false;

    if(Vehicle_ID != ""){
        bool_Vehicle_ID = true;
    }
    if(Manufacturer != ""){
        bool_Manufacturer = true;
    }
    if(manufactured_year != ""){
        bool_manufactured_year = true;
    }
    if(model_no != ""){
        bool_model_no = true;
    }
    if(car_type != ""){
        bool_car_type = true;
    }
    var sql_query = "select * from car ";
    if(bool_Vehicle_ID){
        if(bool_end_check){
            sql_query = sql_query + "and ";
        }
        if(bool_end_check == false){
            sql_query = sql_query + "where ";
            bool_end_check = true;
        }
    sql_query = sql_query + "vehicle_id = '"+Vehicle_ID+"'";

    }
    if(bool_Manufacturer){
        if(bool_end_check){
            sql_query = sql_query + "and ";
        }
        if(bool_end_check == false){
            sql_query = sql_query + "where ";
            bool_end_check = true;
        }
        sql_query = sql_query + "manufacture = '"+Manufacturer+"'";

    }
    if(bool_manufactured_year){
        if(bool_end_check){
            sql_query = sql_query + "and ";
        }
        if(bool_end_check == false){
            sql_query = sql_query + "where ";
            bool_end_check = true;
        }
        sql_query = sql_query + "manufactured_year = '"+manufactured_year+"'";

    }
    if(bool_model_no){
        if(bool_end_check){
            sql_query = sql_query + "and ";
        }
        if(bool_end_check == false){
            sql_query = sql_query + "where ";
            bool_end_check = true;
        }
        sql_query = sql_query + "model_no = '"+model_no+"'";

    }
    if(bool_car_type){
        if(bool_end_check){
            sql_query = sql_query + "and ";
        }
        if(bool_end_check == false){
            sql_query = sql_query + "where ";
            bool_end_check = true;
        }
        sql_query = sql_query + "car_type = '"+car_type+"'";

    }

  //  sql_query = sql_query + ";";

    logger.trace("Searching car");
    mysql.fetchData(sql_query, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            if (results.length > 0) {
                logger.trace("Car found");
                res.send({
                    "status": 200,
                    "message:": "Car search successful",
                    "profile": results
                });
            }
            // render or error
            else {
                logger.trace("No car found");
                res.send({
                    "status": 10,
                    "message:": "Car not found",
                    "profile": results
                });
            }
        }
    });
};

exports.getVehicleIdByBranch = function(req, res){
    var Branch_ID = req.query.Branch_ID;
    logger.trace("Fetching car by branch Id "+ Branch_ID);
    var sql_query = "select * from sells, sells_to where sells_to_ssn = sells_ssn and sells_to_branch_id = '"+Branch_ID+"'";
    mysql.fetchData(sql_query, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
                var sql_query_1 = "select * from sells, sells_to where sells_to_ssn = sells_ssn and sells_to_branch_id = '"+Branch_ID+"'";
                mysql.fetchData(sql_query_1, function(err, results_1) {
                    if (err) {
                        logger.error("Error fetching data "+ err);
                    } else {
                        logger.trace("Car search successful");
                        res.send({
                            "status": 200,
                            "message:": "transaction_vehicle_id fetched by transaction successfully!",
                            "profile": results,
                            "profile_1": results_1
                        });
                    }
                });
        }
    });
};

exports.getCarById = function(req, res){
    var vin = req.query.vin;
    var car = "select * from car where vin = '"+vin+"'";
    logger.trace("Fetching car by vehicle identification number "+ vin);
    mysql.fetchData(car, function(err, results) {
        if (err) {
            logger.error("Error fetching data "+ err);
        } else {
            if (results.length > 0) {
                logger.trace("Car search successful");
                res.send({
                    "status": 200,
                    "message:": "car search successful!",
                    "profile": results
                });
            }
            // render or error
            else {
                logger.trace("Car search empty");
                res.send({
                    "status": 10,
                    "message:": "search returned with empty records!",
                    "profile": results
                });
            }
        }
    });
};



