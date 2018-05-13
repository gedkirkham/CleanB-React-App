using System;
using System.Collections.Generic;

namespace cleaning_rota
{
    public class Add_cleaners
    {
        List<String> user_list = new List<String>();

        public void Add_cleaner_to_list(String _user_name)
        {
            user_list.Add(_user_name);
        }

        public String Get_cleaner_from_list()
        {
            String user = "No users found.";
            foreach (String user_in_list in user_list)
            {
                return user_in_list;
            }

            return user;
        }
    }
}