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
            DateTime end_date = DateTime.Now.AddMonths(4);

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
            byte week_counter = 1;
            byte room = 0;
            byte room_frequency_shift_2 = 0;
            byte room_frequency_shift_3 = 0;
            byte room_frequency_shift_4 = 0;
            foreach (var date in calendar_array)
            {
                if(shift_number < Cleaner.Get_cleaner_list_count())
                {
                    Console.WriteLine(date + "," + Print_cleaner_list_array(shift_number, week_counter, room, room_frequency_shift_2, room_frequency_shift_3, room_frequency_shift_4));
                } else
                {
                    shift_number = 0;
                    Console.WriteLine(date + "," + Print_cleaner_list_array(shift_number, week_counter, room, room_frequency_shift_2, room_frequency_shift_3, room_frequency_shift_4));
                }
                shift_number++;
                room = 0;

                if (week_counter > 3){
                    week_counter = 1;

                    if (room_frequency_shift_2 < Cleaner.Get_cleaner_list_count() - 1)
                    {
                        room_frequency_shift_2++;
                    }
                    else
                    {
                        room_frequency_shift_2 = 0;
                    }

                    if ((room_frequency_shift_4 < Cleaner.Get_cleaner_list_count() - 1))
                    {
                        room_frequency_shift_4++;
                    }
                    else
                    {
                        room_frequency_shift_4 = 0;
                    }
                }
                else
                {
                    week_counter++;
                }

                if (week_counter == 1 || week_counter == 3)
                {
                    if (room_frequency_shift_3 < Cleaner.Get_cleaner_list_count() - 1)
                    {
                        room_frequency_shift_3++;
                    }
                    else
                    {
                        room_frequency_shift_3 = 0;
                    }
                }
            }
        }

        static public string Print_cleaner_list_array(byte shift_number, byte week_counter, byte room, byte room_frequency_shift_2, byte room_frequency_shift_3, byte room_frequency_shift_4)
        {
            return string.Join(",", Create_calendar_row(shift_number, week_counter, room, room_frequency_shift_2, room_frequency_shift_3, room_frequency_shift_4));
        }

        static public (byte, byte, byte) Add_cleaner_to_room(string[] room_frequency_array, byte y, byte z, byte room, byte shift_number, byte week_counter, byte room_frequency_shift_2, byte room_frequency_shift_3, byte room_frequency_shift_4, List<string> cleaner_list_temp)
        {
            string room_frequency = room_frequency_array[room];

            if (y < Cleaner.Get_cleaner_list_count())
            {
                if (y + shift_number < Cleaner.Get_cleaner_list_count())
                {
                    //Add cleaner dependent on room freuency
                    if (room_frequency.Equals("1"))
                    {
                        int cleaner_index = y + 1 + shift_number;

                        cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                    }
                    else if (room_frequency.Equals("2") && week_counter != 4)
                    {
                        int cleaner_index;
                        if (y + 1 + shift_number + room_frequency_shift_2 > Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_index = 1;
                        }
                        else
                        {
                            cleaner_index = y + 1 + shift_number + room_frequency_shift_2;
                        }

                        cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                    }
                    else if (room_frequency.Equals("3") && week_counter != 2 && week_counter != 4)
                    {
                        int cleaner_index;
                        if (y + 1 + shift_number + room_frequency_shift_3 > Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_index = 1;
                        }
                        else
                        {
                            cleaner_index = y + 1 + shift_number + room_frequency_shift_3;
                        }

                        cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                    }
                    else if (room_frequency.Equals("4") && week_counter == 1)
                    {
                        int cleaner_index;
                        if (y + 1 + shift_number + room_frequency_shift_4 > Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_index = 1;
                        }
                        else
                        {
                            cleaner_index = y + 1 + shift_number + room_frequency_shift_4;
                        }

                        cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                    }
                    else
                    {
                        cleaner_list_temp.Add(null);
                    }
                    y++;
                }
                else if (y + shift_number >= Cleaner.Get_cleaner_list_count())
                {
                    if (room_frequency.Equals("1"))
                    {
                        int cleaner_index = z + 1;
                        cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                    }
                    else if (room_frequency.Equals("2") && week_counter != 4)
                    {
                        int cleaner_index;
                        if (z + 1 + room_frequency_shift_2 > Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_index = 1 + room_frequency_shift_2;
                        }
                        else
                        {
                            cleaner_index = z + 1 + room_frequency_shift_2;
                        }

                        cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                    }
                    else if (room_frequency.Equals("3") && week_counter != 2 && week_counter != 4)
                    {
                        int cleaner_index;
                        if (z + 1 + room_frequency_shift_3 > Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_index = 1 + room_frequency_shift_3;
                        }
                        else
                        {
                            cleaner_index = z + 1 + room_frequency_shift_3;
                        }

                        cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                    }
                    else if (room_frequency.Equals("4") && week_counter == 1)
                    {
                        int cleaner_index;
                        if (z + 1 + room_frequency_shift_4 > Cleaner.Get_cleaner_list_count())
                        {
                            cleaner_index = 1 + room_frequency_shift_4;
                        }
                        else
                        {
                            cleaner_index = z + 1 + room_frequency_shift_4;
                        }

                        cleaner_list_temp.Add(Cleaner.Get_cleaner(cleaner_index));
                    }
                    else
                    {
                        cleaner_list_temp.Add(null);
                    }
                    y++;
                    z++;
                }
            }
            else
            {
                y = 0;
                room--;
            }

            return (y, z, room);
        }

        static public List<string> Create_calendar_row(byte shift_number, byte week_counter, byte _room, byte _room_frequency_shift_2, byte _room_frequency_shift_3, byte _room_frequency_shift_4)//duplication of code when cleaning room depending on frequency? Push out to a method?
        {
            //Create temp cleaner list so that it can be increased in size if required
            List<String> cleaner_list_temp = new List<String>();

            string[] room_frequency_array = House.Get_room_frequency();

            byte y = 0;
            byte z = 0;
            byte room = _room;
            byte room_frequency_shift_2 = _room_frequency_shift_2;
            byte room_frequency_shift_3 = _room_frequency_shift_3;
            byte room_frequency_shift_4 = _room_frequency_shift_4;

            //When temp cleaner count is <= room count bulk up the list with current names
            if (Cleaner.Get_cleaner_list_count() <= House.Get_room_list_count())
            {
                for (int room_list_count = House.Get_room_list_count(); room_list_count > cleaner_list_temp.Count; room++)
                {
                    
                    (y, z, room) = Add_cleaner_to_room(room_frequency_array, y, z, room, shift_number, week_counter, room_frequency_shift_2, room_frequency_shift_3, room_frequency_shift_4, cleaner_list_temp);
                }
            }

            //If cleaner count > room count, ensure each room has an assigned cleaner, and shift assigned rooms per cleaner for the next week
            if (Cleaner.Get_cleaner_list_count() > House.Get_room_list_count())
            {
                for (room = 0; room < House.Get_room_list_count(); room++)
                {
                    (y, z, room) = Add_cleaner_to_room(room_frequency_array, y, z, room, shift_number, week_counter, room_frequency_shift_2, room_frequency_shift_3, room_frequency_shift_4, cleaner_list_temp);
                }
            }

            return cleaner_list_temp;
        }
    }
}
