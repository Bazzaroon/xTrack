using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebTrack.Models
{
    public class DataClass
    {
        public string GetUserByEmailPassword(string emailaddress, string pwhash)
        {
            string jsonData = string.Empty;
            using (var ctxt = new xTracktEntities())
            {
                var data = ctxt.ca_user.Where(f => f.EmailAddress == emailaddress);
            }
            return jsonData;
        }
    }
}