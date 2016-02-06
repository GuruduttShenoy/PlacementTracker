using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PlacementTracker.Models;

namespace PlacementTracker.Controllers
{
    public class EmployeeController : ApiController
    {
        // Insert
        public List<Employee> Post(Employee obj)
        {
            EmployeeEntities empObj = new EmployeeEntities();

            if (ModelState.IsValid)
            {
                // insert the customer object to database

                empObj.Employees.Add(obj); // Still in memory, not committed

                empObj.SaveChanges(); //Physical Commit
            }
            List<Employee> employeeList = empObj.Employees.ToList<Employee>(); //Gets the employee list from the employee table

            return employeeList; //Returns the employee list
        }

        // Select
        public List<Employee> Get() // All the record
        {
            // Read the query string
            var allUrlKeyValues = ControllerContext.Request.GetQueryNameValuePairs();

            string EmployeeID = allUrlKeyValues.
                            SingleOrDefault(x => x.Key == "EmployeeID").Value;
            string EmployeeName = allUrlKeyValues.
                            SingleOrDefault(x => x.Key == "EmployeeName").Value;

            EmployeeEntities empObj = new EmployeeEntities();

            List<Employee> empList = new List<Employee>();

            if (EmployeeName != null)
            {
                empList = (from t in empObj.Employees
                                 where t.Name == EmployeeName
                           select t).ToList<Employee>();
            }
            else if (EmployeeID!=null)
            {
                int empID = Convert.ToInt32(EmployeeID);
                empList = (from t in empObj.Employees
                                 where t.EmployeeID == empID
                           select t).ToList<Employee>();
            }
            else
            {
                empList = empObj.Employees.ToList<Employee>();
            }

            return empList;
        }


        // Update PUT
        public List<Employee> Put(Employee obj)
        {
            EmployeeEntities empObj = new EmployeeEntities();

            if (obj!=null && obj.EmployeeID!=0)
            { 
           
            // Select the record ( LINQ )
            Employee empUpdate = (from temp in empObj.Employees
                                   where temp.EmployeeID == obj.EmployeeID
                                   select temp).ToList<Employee>()[0];

            //Updates the details as per the details from the front page

            empUpdate.Name = obj.Name;
            empUpdate.Age = obj.Age;
            empUpdate.Address = obj.Address;
            empUpdate.Active = obj.Active;
            empUpdate.Employment = obj.Employment;

            empObj.SaveChanges();

            }

            List<Employee> empList = empObj.Employees.ToList<Employee>();

            return empList;

        }

        // Delete Delete
        public List<Employee> Delete(Employee obj)
        {
            EmployeeEntities empObj = new EmployeeEntities();
            if (obj!=null && obj.EmployeeID!=0)
            { 
            // Delete
            

            Employee empDelete = (from temp in empObj. Employees
                                   where temp.EmployeeID == obj.EmployeeID
                                   select temp).ToList<Employee>()[0];

            empObj.Employees.Remove(empDelete); // changes still inside memory

            empObj.SaveChanges();// Physical commit

            }

            List<Employee> empList = empObj.Employees.ToList<Employee>();

            return empList;
        }



    }
}
