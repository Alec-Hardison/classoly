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
fs.readFile('assignments.json', async (err,data) =>{
    activities = await JSON.parse(data);
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
    this.changing = false;
    this.grade = grade;
    this.id = id;
    this.challenge;
    this.waitList;
    this.add = function(activity)
    {
        //console.log(students);
        let count = 0;
        console.log(activity);
        
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
                if(this.chnaging)
                    {
                        waitlist();
                    }
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
app.post("/list",(req,res) =>
        {
    let person = req.body.student;
    let event = [];
    for(let i = 0; i< activities.length; i ++)
        {
           
        }
});
app.post('/answer',(req, res) => {
        let person = new student(req.body.data.student.name, req.body.data.student.grade, req.body.data.student.id);
        act1 = one;
        act2 = two;
        check(person).add(act1)
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


function check(student) {
    for(let i = 0; i<students.length; i++)
        {
            if(students[i].name == student.name && students[i].grade == student.grade && students[i].id == student.id )
                {
                    students[i].changing = true;
                    let [temp] = students.splice(i,1);
                    return temp;
                }
        }
    return student;
}

function waitlist() {
    for(let i = 0; i<students.length-1; i++)
        {
     let count = 0;
        for(let j = i+1; i<students.length;i++)
            {
                
                if(students[i].grade == students[j].grade && students[i].waitlist == students[j].waitlist)
                    {
                        count += 1;
                        console.log(count);
                    }
            }
        if(count<students[i].waitlist.max)
            {
                console.log("ran")
                students[i].challenge = students[i].waitList;
                students[i].waitList;
                console.log(this)
                students.push(this);
                return true;
            }
        else
            {
               // console.log(this.name + " has been rejected");
                return false;
                
            }
        }
}






