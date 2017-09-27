using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;


namespace WebTrack.Controllers
{
    public class XDataController : Controller
    {
        [HttpPost]
        public string GetUserData()
        {
            using (var input = new StreamReader(HttpContext.Request.InputStream))
            {
                var data = JsonConvert.DeserializeObject(input.ReadToEnd());
                var a = 12;
            }
            return null;
        }
    }
}
