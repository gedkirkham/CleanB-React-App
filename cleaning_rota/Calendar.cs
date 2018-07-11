using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    static public class Calendar
    {
        static List<String> calendar_array = new List<String>();

        static public void Cleaner_andor_rooms_list_count_limit_check()
        {
            Console.WriteLine();

            if(Cleaner.Get_cleaner_list_count() == 0 && House.Get_room_list_count() == 0)
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
            DateTime end_date = DateTime.Now.AddMonths(2);

            TimeSpan diff = end_date - start_date;
            int days = diff.Days;

            for (int i = 0; i <= days; i++)
            {
                var weekend_date = start_date.AddDays(i);
                switch (weekend_date.DayOfWeek)
                {
                    case DayOfWeek.Saturday:
                        calendar_array.Add(weekend_date.ToShortDateString());
                        break;
                }
            }

            Console.WriteLine();
            Console.WriteLine("Calendar:");
            Console.WriteLine("Date," + House.Print_room_list_array());

            byte shift_number = 0;
            foreach (var date in calendar_array)
            {
                if(shift_number < Cleaner.Get_cleaner_list_count())
                {
                    Console.WriteLine(date + "," + Print_cleaner_list_array(shift_number));
                    shift_number++;
                } else
                {
                    shift_number = 0;
                    Console.WriteLine(date + "," + Print_cleaner_list_array(shift_number));
                    shift_number++;
                }
            }
        }

        static public string Print_cleaner_list_array(byte shift_number)
        {
            return string.Join(",", Create_calendar_row(shift_number));
        }

        static public List<string> Create_calendar_row(byte shift_number)
        {
            //Create temp cleaner list so that it can be increased in size if required
            List<String> cleaner_list_temp = new List<String>();

            //When temp cleaner count is <= room count bulk up the list with current names
            if (Cleaner.Get_cleaner_list_count() <= House.Get_room_list_count())
            {
                byte y = 0;
                byte z = 0;
                for (int room_list_count = House.Get_room_list_count(); room_list_count > cleaner_list_temp.Count;)
                {
                    if (y < Cleaner.Get_cleaner_list_count())
                    {
                        if (y + shift_number >= Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_list_temp.Add(Cleaner.Get_cleaner(z + 1));
                            y++;
                            z++;
                        }
                        else if (y + shift_number < Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_list_temp.Add(Cleaner.Get_cleaner(y + 1 + shift_number));
                            y++;
                        }
                    }
                    else
                    {
                        y = 0;
                    }
                }
            }

            //If cleaner count > room count, ensure each room has an assigned cleaner, and shift assigned rooms per cleaner for the next week
            if (Cleaner.Get_cleaner_list_count() > House.Get_room_list_count())
            {
                byte y = 0;
                byte z = 0;

                for (byte i = 0; i < House.Get_room_list_count(); i++)
                {
                    if (y < Cleaner.Get_cleaner_list_count())
                    {
                        if (y + shift_number < Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_list_temp.Add(Cleaner.Get_cleaner(y + 1 + shift_number));
                            y++;
                        }
                        else if (y + shift_number >= Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_list_temp.Add(Cleaner.Get_cleaner(z + 1));
                            y++;
                            z++;
                        }
                    }
                    else
                    {
                        y = 0;
                    }
                }
            }

            return cleaner_list_temp;
        }
    }
}
