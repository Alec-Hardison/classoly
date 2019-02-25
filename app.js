const express = require('express');
const fs = require('fs');
const app = express();

let students = [];

fs.readFile('db.json', (err, data) => {
    students = JSON.parse(data);
});

function activity(teacher,room,amount) {
    this.teacher = teacher;
    this.room = room;
    this.amount = amount;
    this.participants = [];
    this.add= function(student) 
    {
        var grade = student.grade;
        var count = 0;
        for(var i = 0; i<this.participants.length;i++)
            {
                
                if(this.participants[i].grade == grade)
                    {
                        
                        count +=1;
                    }
            }
      
        if(count<this.amount)
            this.participants.push(student)
        else
            return null;
        }
    }



app.use(express.static('public'));
app.use(express.json());

app.get('/',(req, res) => {
    
    console.log(`IP address ${req.ip}`);
    res.send(students);
    
});

app.get('/movielist', (req, res) => {
    
})

app.post('/answer',(req, res) => {
        students.push(req.body.data.student);
       
        fs.writeFile('db.json', JSON.stringify(students), (err) => {
        console.log(students);
        console.warn(err);
            
    });
        
    
})


app.listen(3000, () => {
    console.log('Server started...');
});
