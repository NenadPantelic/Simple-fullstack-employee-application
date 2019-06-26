using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


using System.Data;
using WebAPI.Models;
using System.Data.SqlClient;
using System.Configuration;

namespace WebAPI.Controllers
{
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
        {

            DataTable table = new DataTable();
            string query = @"SELECT EmployeeID, EmployeeName, Department, Mail, convert(varchar(10), DateOfJoining, 120) as DateOfJoining FROM Employee;";
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Employee employee)
        {
            System.Diagnostics.Debug.WriteLine(employee.EmployeeID);


            try
            {
                DataTable table = new DataTable();
                string query = @"INSERT INTO Employee(EmployeeName, Department, Mail, DateOfJoining) VALUES('"
                + employee.EmployeeName + "','" + employee.Department + "','" + employee.Mail + "','" + employee.DateOfJoining + @"');";
                System.Diagnostics.Debug.WriteLine(query);

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Employee instance added successfully";
            }

            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                return "Employee cannot be added";

            }

        }

        public string Put(Employee employee)
        {

            try
            {
                DataTable table = new DataTable();
                string query = @"UPDATE Employee SET EmployeeName = '" + employee.EmployeeName + "', Department = '" +
                     employee.Department + "', Mail = '" + employee.Mail + "', DateOfJoining = '" + employee.DateOfJoining + "'WHERE" +
                     " EmployeeID = '" + employee.EmployeeID + "';";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Employee instance updated successfully";
            }

            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                return "Employee cannot be updated";

            }

        }

        public string Delete(long id)
        {

            try
            {
                DataTable table = new DataTable();
                string query = @"DELETE Employee WHERE EmployeeID = '" + id + "';";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Employee instance deleted successfully";
            }

            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                return "Employee cannot be deleted";

            }

        }

    }
}
