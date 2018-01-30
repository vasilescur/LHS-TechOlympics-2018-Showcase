# [TechOlympics 2018](https://techolympics.org) Showcase Project - Loveland High School

[![Build Status](https://travis-ci.org/vasilescur/Loveland-Showcase.svg?branch=master)](https://travis-ci.org/vasilescur/Loveland-Showcase) ![Version](https://img.shields.io/badge/version-0.1-blue.svg) ![Contributors](https://img.shields.io/badge/contributors-1-blue.svg)

## [Website](https://vasilescur.github.io/Loveland-Showcase/)

## Project

We made student RFID-powered keycards. These cards can be used for attendance check-in, signing out library books, 
hall passes, and any other application requiring a student catalog.


## How it works

RFID cards are read by an Arduino with an RFID shield, running a `Java` program:

```java
...
uint8_t data[16];

//Try to read the contents of block 4
success = nfc.mifareclassic_ReadDataBlock(4, data);
		
if (success)
{
    // Data seems to have been read ... output to serial
    nfc.PrintHexChar(data, 16);
...
```

The serial output containing each student's ID is read by a `Python` script, like this:

```python
...
ser = serial.Serial('COM5', 115200)

while 1:
    serial_line = ser.readline().decode()

    #* sys.stdout is intercepted by NodeJS
    print(serial_line[49:55])
...
```
This output is read by a `NodeJS` server. This server uses the student ID to query a `MySQL` database storing students and events:

```javascript
// When students scan in, run this
listener.stdout.on('data', (data) => {
    console.log('Scanned in: ' + data.toString());
    scanIn(data);
});
```

```javascript
function printStudentInfo(id) {
    console.log('Student info for ' + id);
    con.query('SELECT * FROM Students WHERE `ID` = ' + id, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
}
```


## Our Team

This project was created by the Loveland High School's [INTERalliance](http://interalliance.org) chapter.

### Development Team

| Name | Role |
| ------------- | ------------- |
| [Radu Vasilescu](http://raduvasilescu.com)  | Lead Developer  |
| Emily Kiehl  | Developer  |
| Jonathan Mangan | Developer |
| Jackson Daumeyer | Developer |
| Quinn James | Developer |

### Build Team

| Name | Role |
| --------------| ------------- |
| Jonah Smith | Build Team Leader |
| Garrett Royal | Build Team Member |
| Cooper Baumgarth | Build Team Member |
| Max Hannah | Build Team Member |

### Design Team 

| Name | Role |
| -------------| ------------- |
| Abbie Docter | Lead Designer |
| Morgan McKinney | Designer |
| Leslie Nash | Designer |
| Lydia Filgis | Designer |

### Integration Team

| Name | Role |
| -------------| ------------- |
| Haley Dues | Integration Team Leader |
| Zo&eacute; Long | Integration Team Member |
| Patricia Lennon | Integration Team Member |
