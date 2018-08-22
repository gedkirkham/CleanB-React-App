using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.IO;
using cleaning_rota;

namespace cleaning_rota.test.unit
{
    [TestClass]
    public class Calendar_test
    {
        private int row_length;
        private int column_length;

        [TestInitialize]
        public void TestInitialise()
        {
            row_length = 0;
            column_length = 0;
            House.house_dictionary.Clear();
        }

        public void Calendar_output(string user, bool positive)
        {
            Login.Set_user_email(user);
            Login.Set_user_data(user);
            Calendar.Display_calendar();

            string[,] actual_calendar = Calendar.Calendar_2d_array;
            string[,] expected_calendar = new string[row_length, column_length];

            using (var readers = new StreamReader(@"../../expected_output/" + user + "_calendar.csv"))
            {
                while (readers.ReadLine() != null)
                {
                    row_length++;
                }
                row_length--;
            }

            using (var reader = new StreamReader(@"../../expected_output/" + user + "_calendar.csv"))
            {
                
                for (int current_row = 0; current_row < row_length; current_row++)
                {
                    var line = reader.ReadLine();
                    var values = line.Split(',');
                    column_length -= values.Count();

                    for (int current_column = 0; current_column < column_length; current_column++)
                    {
                        if (values[current_column] == String.Empty)
                        {
                            values[current_column] = null;
                        }

                        expected_calendar[current_row, current_column] = values[current_column];
                    }
                }
            }

            for (int column = 1; column < expected_calendar.GetLength(1); column++)
            {
                for (int row = 0; row < expected_calendar.GetLength(0); row++)
                {
                    if(positive = true)
                    {
                        Assert.AreEqual(expected_calendar[row, column], actual_calendar[row, column]);
                    }
                    else if(positive = false)
                    {
                        Assert.AreNotEqual(expected_calendar[row, column], actual_calendar[row, column]);
                    }
                }
            }
        }

        [TestMethod]
        public void Calendar_output_user01()
        {
            Calendar_output("user01",true);
        }

        [TestMethod]
        public void Calendar_output_user02()
        {
            Calendar_output("user02",true);
        }

        [TestMethod]
        public void Calendar_output_user03()
        {
            Calendar_output("user03",true);
        }

        [TestMethod]
        public void Calendar_output_user04()
        {
            Calendar_output("user04",true);
        }

        [TestMethod]
        public void Calendar_output_user05()
        {
            Calendar_output("negative_test",false);
        }
    }
}