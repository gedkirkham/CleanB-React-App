using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    static public class Calendar
    {
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
            Console.ReadLine();
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
            Console.WriteLine();
            Console.WriteLine("Calendar:");
            Console.WriteLine(House.Print_room_list_array());
        }
    }
}
