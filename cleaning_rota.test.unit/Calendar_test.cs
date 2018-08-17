using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.IO;

namespace cleaning_rota.test.unit
{
    [TestClass]
    public class Calendar_test
    {
        private readonly Login _Login = new Login();
        private readonly Calendar _Calendar = new Calendar();
        private int row_length = 18;
        private int column_length = 5;

        [TestMethod]
        public void Calendar_output_user01()
        {
            string user = "user01";
            Login.Set_user_email(user);
            Login.Set_user_data(user);
            Calendar.Display_calendar();

            string[,] actual_calendar = Calendar.Calendar_2d_array;
            string[,] expected_calendar = new string[row_length, column_length];

            using (var reader = new StreamReader(@"../../expected_output/user01_calendar.csv"))
            {
                for (int current_row = 0; current_row < row_length; current_row++)
                {
                    var line = reader.ReadLine();
                    var values = line.Split(',');

                    for (int current_column = 0; current_column < column_length; current_column++)
                    {
                        if(values[current_column] == String.Empty)
                        {
                            values[current_column] = null;
                        }

                        expected_calendar[current_row, current_column] = values[current_column];
                    }
                }
            }


            string null_string = null;
            //string[,] expected_calendar = {
            //  {"Date","Kitchen","Bedroom","Lounge","Garage"},
            //  {"00/00/0000","Ged","Razvan",null_string,null_string},
            //  {"00/00/0000","Razvan",null_string,"Ged","Razvan"},
            //  {"00/00/0000","Ged","Ged",null_string,null_string},
            //  {"00/00/0000","Razvan",null_string,null_string,null_string},
            //  {"00/00/0000","Ged","Razvan",null_string,null_string},
            //  {"00/00/0000","Razvan",null_string,"Razvan","Ged"},
            //  {"00/00/0000","Ged","Ged",null_string,null_string},
            //  {"00/00/0000","Razvan",null_string,null_string,null_string},
            //  {"00/00/0000","Ged","Razvan",null_string,null_string},
            //  {"00/00/0000","Razvan",null_string,"Ged","Razvan"},
            //  {"00/00/0000","Ged","Ged",null_string,null_string},
            //  {"00/00/0000","Razvan",null_string,null_string,null_string},
            //  {"00/00/0000","Ged","Razvan",null_string,null_string},
            //  {"00/00/0000","Razvan",null_string,"Razvan","Ged"},
            //  {"00/00/0000","Ged","Ged",null_string,null_string},
            //  {"00/00/0000","Razvan",null_string,null_string,null_string},
            //  {"00/00/0000","Ged","Razvan",null_string,null_string},
            //  {"00/00/0000","Razvan",null_string,"Ged","Razvan"}
            //};

            for (int column = 1; column < expected_calendar.GetLength(1); column++)
            {
                for (int row = 0; row < expected_calendar.GetLength(0); row++)
                {
                    Assert.AreEqual(expected_calendar[row, column], actual_calendar[row, column]);
                }
            }
        }
    }
}