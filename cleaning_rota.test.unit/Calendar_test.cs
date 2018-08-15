using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace cleaning_rota.test.unit
{
    [TestClass]
    public class Calendar_test
    {
        private readonly Login _Login = new Login();
        private readonly Calendar _Calendar = new Calendar();

        [TestMethod]
        public void Calendar_output_user01()
        {
            string user = "user01";
            Login.Set_user_email(user);
            Login.Set_user_data(user);
            Calendar.Display_calendar();
            Thread.Sleep(2000);

            string[,] calendar = Calendar.Calendar_2d_array;

            string null_string = null;
            string[,] expected_calendar = {
              {"Date","Kitchen","Bedroom","Lounge","Garage"},
              {"00/00/0000","Ged","Razvan",null_string,null_string},
              {"00/00/0000","Razvan",null_string,"Ged","Razvan"},
              {"00/00/0000","Ged","Ged",null_string,null_string},
              {"00/00/0000","Razvan",null_string,null_string,null_string},
              {"00/00/0000","Ged","Razvan",null_string,null_string},
              {"00/00/0000","Razvan",null_string,"Razvan","Ged"},
              {"00/00/0000","Ged","Ged",null_string,null_string},
              {"00/00/0000","Razvan",null_string,null_string,null_string},
              {"00/00/0000","Ged","Razvan",null_string,null_string},
              {"00/00/0000","Razvan",null_string,"Ged","Razvan"},
              {"00/00/0000","Ged","Ged",null_string,null_string},
              {"00/00/0000","Razvan",null_string,null_string,null_string},
              {"00/00/0000","Ged","Razvan",null_string,null_string},
              {"00/00/0000","Razvan",null_string,"Razvan","Ged"},
              {"00/00/0000","Ged","Ged",null_string,null_string},
              {"00/00/0000","Razvan",null_string,null_string,null_string},
              {"00/00/0000","Ged","Razvan",null_string,null_string},
              {"00/00/0000","Razvan",null_string,"Ged","Razvan"}
            };

            for (int column = 1; column < expected_calendar.GetLength(1); column++)
            {
                for (int row = 0; row < expected_calendar.GetLength(0); row++)
                {
                    Assert.AreEqual(expected_calendar[row, column], calendar[row, column]);
                }
            }
        }
    }
}