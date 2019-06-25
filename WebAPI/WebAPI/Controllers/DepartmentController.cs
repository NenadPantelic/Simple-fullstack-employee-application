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
    public class DepartmentController : ApiController
    {
       public HttpResponseMessage Get()
        {

            DataTable table = new DataTable();
            string query = @"SELECT DepartmentID, DepartmentName FROM Department;";
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }


        public string Post(Department dep)
        {

            try
            {
                DataTable table = new DataTable();
                string query = @"INSERT INTO Department VALUES('" + dep.DepartmentName + @"');";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Department instance added successfully";
            }

            catch ( Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                return "Department cannot be added";

            }
           
        }


        public string Put(Department dep)
        {

            try
            {
                DataTable table = new DataTable();
                string query = @"UPDATE Department SET DepartmentName = '" + dep.DepartmentName + @"' WHERE DepartmentID = '" + dep.DepartmentID + "';";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Department instance updated successfully";
            }

            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                return "Department cannot be updated";

            }

        }

        public string Delete(long id)
        {

            try
            {
                DataTable table = new DataTable();
                string query = @"DELETE Department WHERE DepartmentID = '" + id + "';";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Department instance deleted successfully";
            }

            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                return "Department cannot be deleted";

            }

        }
    }
}
