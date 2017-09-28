using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft;
using WebTrack.Models;


namespace WebTrack.Controllers
{
    public class XDataController : Controller
    {
        [HttpPost]
        public string GetUserData()
        {
            string jsonData = string.Empty;

            using (var input = new StreamReader(HttpContext.Request.InputStream))
            {
                dynamic data = JsonConvert.DeserializeObject(input.ReadToEnd());
                var user = data.creds.user.Value;
                var pwhash = data.creds.pwd.Value;

                var dc = new AllData();
                jsonData = dc.GetUserByName(user, pwhash);

               // Response.Write(jsonData);
            }
            
            return jsonData;
        }
    }
}
