using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    static public class Calendar
    {
        static List<String> calendar_date_array = new List<String>();

        static public void Cleaner_andor_rooms_list_count_limit_check()
        {
            Console.WriteLine();

            if (Cleaner.Get_cleaner_list_count() == 0 && House.Get_room_list_count() == 0)
            {
                Console.WriteLine(Constants.cleaners_and_rooms_required);
                Cleaner.Cleaner_nothing_returned();
                House.House_nothing_returned();

                if (Cleaner.Get_cleaner_list_count() == 0 || House.Get_room_list_count() == 0)
                {
                    Console.WriteLine();
                    Console.WriteLine(Constants.cleaners_and_rooms_required);
                }
            }
            else if (Cleaner.Get_cleaner_list_count() == 0 && House.Get_room_list_count() > 0)
            {
                Console.WriteLine(Constants.cleaners_required);
                Cleaner.Cleaner_nothing_returned();

                if (Cleaner.Get_cleaner_list_count() == 0 && House.Get_room_list_count() > 0)
                {
                    Console.WriteLine();
                    Console.WriteLine(Constants.cleaners_required);
                }
            }
            else if (Cleaner.Get_cleaner_list_count() > 0 && House.Get_room_list_count() == 0)
            {
                Console.WriteLine(Constants.rooms_required);
                House.House_nothing_returned();

                if (Cleaner.Get_cleaner_list_count() > 0 && House.Get_room_list_count() == 0)
                {
                    Console.WriteLine();
                    Console.WriteLine(Constants.rooms_required);
                }
            }
        }

        static public void Room_list_count()
        {
            Console.WriteLine();
            Console.WriteLine(Constants.rooms_required);
            string _user_input = House.House_nothing_returned();
        }

        static public void Calendar_check()
        {
            Cleaner_andor_rooms_list_count_limit_check();

            if (Cleaner.Get_cleaner_list_count() > 0 && House.Get_room_list_count() > 0)
            {
                Display_calendar();
            }
            else
            {
                Menu.Main_menu();
            }
        }

        static public void Display_calendar()
        {
            DateTime start_date = DateTime.Now;
            DateTime end_date = DateTime.Now.AddMonths(4);

            TimeSpan diff = end_date - start_date;
            int days = diff.Days;

            for (int i = 0; i <= days; i++)
            {
                var weekend_date = start_date.AddDays(i);
                switch (weekend_date.DayOfWeek)
                {
                    case DayOfWeek.Saturday:
                        calendar_date_array.Add(weekend_date.ToShortDateString());
                        break;
                }
            }

            Console.WriteLine();
            Console.WriteLine("Calendar:");

            byte room_incrementor = 0;
            var null_check = String.Empty;

            List<String> cleaner_list_temp = new List<String>();
            string[,] calendar = new string[calendar_date_array.Count + 1, House.Get_room_list_count() + 1];
            calendar[0, 0] = "Date";

            byte calendar_index = 1;
            foreach (var date in calendar_date_array)
            {
                calendar[calendar_index, 0] = date;
                calendar_index++;
            }

            calendar_index = 1;
            foreach (var room in House.Get_room_list_array())
            {
                calendar[0, calendar_index] = room;
                calendar_index++;
            }

            foreach (var room in House.Get_room_list_array())
            {
                var house_list_array = House.Get_room_list_array();
                (string room_name, string room_frequency) = House.Get_room(house_list_array[room_incrementor]);
                cleaner_list_temp.Clear();
                byte cleaner_index = 0;
                byte week_counter = 1;

                cleaner_index += room_incrementor;

                foreach (var date in calendar_date_array)
                {
                    if (room_frequency.Equals("1"))
                    {
                        if (cleaner_index >= Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_index = 0;
                            cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index++));
                        }
                        else
                        {
                            null_check = String.Empty;
                            if (cleaner_list_temp.Count > 0)
                            {
                                null_check = cleaner_list_temp[cleaner_list_temp.Count - 1];
                            }

                            if (null_check == null)
                            {
                                cleaner_index++;

                                if (cleaner_index >= Cleaner.Get_cleaner_list_count())
                                {
                                    cleaner_index = 0;
                                }

                                cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                            }
                            else
                            {
                                cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index++));
                            }
                        }
                    }
                    else if (room_frequency.Equals("2") && week_counter != 4)
                    {
                        if (cleaner_index >= Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_index = 0;
                            cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));

                            if (Cleaner.Get_cleaner_list_count() == 2)
                            {
                                cleaner_index++;
                            }
                        }
                        else
                        {
                            null_check = String.Empty;
                            if (cleaner_list_temp.Count > 0)
                            {
                                null_check = cleaner_list_temp[cleaner_list_temp.Count - 1];
                            }

                            if (null_check == null)
                            {
                                cleaner_index++;

                                if (cleaner_index >= Cleaner.Get_cleaner_list_count() && Cleaner.Get_cleaner_list_count() != 2)
                                {
                                    cleaner_index = 0;
                                }
                                else if (Cleaner.Get_cleaner_list_count() == 2)
                                {
                                    cleaner_index--;
                                }

                                cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index++));
                            }
                            else
                            {
                                cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index++));
                            }
                        }
                    }
                    else if (room_frequency.Equals("3") && week_counter != 2 && week_counter != 4)
                    {
                        if (cleaner_index >= Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_index = 0;
                            cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                        }
                        else
                        {
                            null_check = String.Empty;
                            if (cleaner_list_temp.Count > 0)
                            {
                                null_check = cleaner_list_temp[cleaner_list_temp.Count - 1];
                            }

                            if (null_check == null)
                            {
                                cleaner_index++;

                                if (cleaner_index >= Cleaner.Get_cleaner_list_count())
                                {
                                    cleaner_index = 0;
                                }

                                cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                            }
                            else
                            {
                                cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index++));
                            }
                        }
                    }
                    else if (room_frequency.Equals("4") && week_counter == 1)
                    {
                        if (cleaner_index >= Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_index = 0;
                            cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                        }
                        else
                        {
                            null_check = String.Empty;
                            if (cleaner_list_temp.Count > 0)
                            {
                                null_check = cleaner_list_temp[cleaner_list_temp.Count - 1];
                                if (null_check == null)
                                {
                                    cleaner_index++;

                                    if (cleaner_index >= Cleaner.Get_cleaner_list_count())
                                    {
                                        cleaner_index = 0;
                                    }

                                    cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                                }
                            }
                            else
                            {
                                cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                            }
                        }
                    }
                    else
                    {
                        cleaner_list_temp.Add(null);
                    }

                    if (week_counter == 4)
                    {
                        week_counter = 1;
                    }
                    else
                    {
                        week_counter++;
                    }
                }

                for (int cleaner_list_counter = 0; cleaner_list_counter < cleaner_list_temp.Count; cleaner_list_counter++)
                {
                    string cleaner = cleaner_list_temp[cleaner_list_counter];
                    calendar[cleaner_list_counter + 1, room_incrementor + 1] = cleaner;
                }

                room_incrementor++;
            }

            string path = @"../../user_output/" + Login.Email + "_calendar.csv";
            using (StreamWriter sw = File.CreateText(path))
            {
                int rowLength = calendar.GetLength(0);
                int colLength = calendar.GetLength(1);
                for (int i = 0; i < rowLength; i++)
                {
                    for (int j = 0; j < colLength; j++)
                    {
                        Console.Write(string.Format("{0},", calendar[i, j]));
                        sw.Write(string.Format("{0},", calendar[i, j]));
                    }
                    Console.Write(Environment.NewLine);
                    sw.Write("\n");
                }
            }
        }
    }
}
