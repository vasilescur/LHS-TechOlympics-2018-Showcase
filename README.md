# TechOlympics 2018 Showcase Project - Loveland High School


## Project

We made student RFID-powered keycards. These cards can be used for attendance check-in, signing out library books, 
hall passes, and any other application requiring a student catalog.


## How it works

RFID cards are read by an Arduino with an RFID shield, running a `Java` program. The serial output containing each 
student's ID is read by a `Python` script, which then feeds it into a `NodeJS` server. This server uses the student
ID to query a `MySQL` database storing students and events.


## Our Team

This project was created by the Loveland High School's INTERalliance chapter.
