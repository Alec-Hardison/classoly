const express = require('express');
const fs = require('fs');
const app = express();
var act1;
var act2;
var students = [];
var activities = [];

fs.readFile('db.json', async (err, data) => {
    students = await JSON.parse(data);
   
});


function activity(teacher,room,max,description)
{
    this.teacher = teacher;
    this.room = room;
    this.max = max;
    this.description = description;
}

function student(name,grade,id)
{
    this.name = name;
    this.ran = false;
    this.isWaiting = false;
    this.grade = grade;
    this.id = id;
    this.challenge;
    this.waitList;
    this.add = function(activity)
    {
        //console.log(students);
        let count = 0;

         for(let i = 0; i<students.length;i++)
             {
                
                 console.log( students[i].grade + " " +  this.grade);
                 console.log( students[i].id + " " +  this.id);
                 console.log( students[i].name + " "  +  this.name);
                 if(students[i].grade == this.grade && students[i].name == this.name && students[i].id == this.id)
                     {
                         console.log("hi line 47");
                         console.log(students.splice(i,1));
                     }
             }
        for(let i = 0; i<students.length;i++)
            {
                
                if(students[i].grade == this.grade && students[i].challenge == activity)
                    {
                        count += 1;
                        console.log(count);
                    }
            }
        if(count<activity.max)
            {
                console.log("ran")
                this.challenge = activity;
                console.log(this)
                students.push(this);
                return true;
            }
        else
            {
               // console.log(this.name + " has been rejected");
                if(!this.ran)
                    {
                        this.ran = true;
                        this.waitlist = activity;
                        this.add(act2)
                        this.isWaiting = true;
                    }
                return false;
                
            }
    }
   
}

let one =  new activity("teacher","a3",5,"description");
let two = new activity("teacher2","a4",3,"description2");


app.use(express.static('public'));
app.use(express.json());

app.get('/',(req, res) => {
    
    //console.log(`IP address ${req.ip}`);
    res.send(students);
    
});

app.get('/movielist', (req, res) => {
    
})

app.post('/answer',(req, res) => {
        let person = new student(req.body.data.student.name, req.body.data.student.grade, req.body.data.student.id);
        act1 = one;
        act2 = two;
    person.add(act1);
        fs.writeFile('db.json', JSON.stringify(students), (err) => {
        //console.log(students);
        console.warn(err);
            
    });
        
    
})


app.listen(3000, () => {
    console.log('Server started...');
});


function search(id)
{
    for(let i = 0;i<students.length;i++)
        {
            if(students[i].id == id)
                {
                    return students[i].name + students[i].challenge;
                }
        }
}
