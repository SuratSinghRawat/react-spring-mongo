import axios from 'axios';
import {useEffect, useState } from "react";
 
function Student()
{
  const [studentid, setId] = useState('');
  const [studentname, setName] = useState("");
  const [studentadd, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [students, setUsers] = useState([]);
  
  const PROTOCAL =process.env.REACT_APP_PROD_PROTOCAL
  const IP = process.env.REACT_APP_PROD_IP
  const PORT = process.env.REACT_APP_PROD_PORT
  //const BACKENDAPI = PROTOCAL + "://" + IP + ":" + PORT
  const BACKENDAPI=process.env.REACT_APP_API_BASE_URL

 
useEffect(() => {
  (async () => await Load())();
  }, []);
 
 
  async function  Load()
  {
    const result = await axios.get(
      BACKENDAPI + "/api/v1/student/getAll");      
    //"http://34.131.228.52:8088/api/v1/student/getAll");    
         setUsers(result.data);
         console.log(result.data);
  }
 

  
     async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post(BACKENDAPI+"/api/v1/student/save",
        {
        studentname: studentname,
        studentadd: studentadd,
        mobile: mobile
        });
          alert("Student Registation Successfully");
          setId("");
          setName("");
          setAddress("");
          setMobile("");
          Load();
        }
    catch(err)
        {
          alert("User Registation Failed");
        }
   }

 
   async function editStudent(students)
   {
    setName(students.studentname);
    setAddress(students.studentadd);
    setMobile(students.mobile); 
    setId(students._id);
   }
 
   async function DeleteStudent(studentid)
   {
        await axios.delete(BACKENDAPI+"/api/v1/student/delete/" + studentid); 
        alert("Student deleted Successfully");
        Load();
   }
 
   async function update(event)
   {
    event.preventDefault();
 
   try
       {
        await axios.put(BACKENDAPI+"/api/v1/student/edit/" + studentid ,
       {

        studentname: studentname,
        studentadd: studentadd,
        mobile: mobile
       
       });
         alert("Registation Updateddddd");
         setId("");
         setName("");
         setAddress("");
         setMobile("");
         Load();
       }
   catch(err)
       {
         alert("Student Updateddd Failed");
       }
  }

return (
    <div>
       <h1>Student Details</h1>
       <div class="container mt-4" >
          <form>
             
              <div class="form-group">
                <label>Student Name</label>
                <input  type="text" class="form-control" id="studentname"
                value={studentname}
                onChange={(event) =>
                  {
                    setName(event.target.value);      
                  }}
                />
              </div>


              <div class="form-group">
                <label>Student Address</label>
                <input  type="text" class="form-control" id="studentadd" 
                 value={studentadd}
                  onChange={(event) =>
                    {
                      setAddress(event.target.value);      
                    }}
                />
              </div>

              <div class="form-group">
                <label>Mobile</label>
                <input type="text" class="form-control" id="mobile" 
                  value={mobile}
                onChange={(event) =>
                  {
                    setMobile(event.target.value);      
                  }}
                />


              </div>
              <div>
              <button   class="btn btn-primary mt-4"  onClick={save}>Register</button>

              <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
              </div>   
            </form>
          </div>
       {/* <br/>             */}
        

<table class="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">Student Name</th>
      <th scope="col">Student Address</th>
      <th scope="col">Student Mobile</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
       {students.map(function fn(student)
       {
            return(
            <tbody>
                <tr>
                <td>{student.studentname}</td>
                <td>{student.studentadd}</td>
                <td>{student.mobile}</td>        
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editStudent(student)} >Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => DeleteStudent(student._id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
       </div>
            );
        }
  
  export default Student;