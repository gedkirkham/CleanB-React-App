using System;
using System.Collections.Generic;

namespace cleaning_rota
{
    public class House
    {
        public static Dictionary<string, Tuple<string, string, List<string>>> house_dictionary = new Dictionary<string, Tuple<string, string, List<string>>>();

        static public void Add_room()
        {
            bool add_flag = false;
            do
            {
                Console.WriteLine();
                Console.Write("Name: ");
                string _room_name = Console.ReadLine() ?? String.Empty; // TODO: add some error checking i.e. character count

                string _room_frequency;
                List<string> exclusion_list = new List<string>();
                bool number_validation_flag;
                int _room_frequency_converted;
                do
                {
                    do
                    {
                        Console.WriteLine();
                        Console.Write(Constants.cleaning_frequency_menu_text, _room_name, Constants.select);

                        _room_frequency = Console.ReadLine() ?? String.Empty;
                        (number_validation_flag, _room_frequency_converted) = User_input_verification.Number_validation(_room_frequency);
                    } while (number_validation_flag);
                } while (User_input_verification.Number_range(_room_frequency_converted, Constants.cleaning_frequency_menu_text_count));

                Add_room_to_list(_room_name, _room_frequency, exclusion_list);

            } while (Menu.Add_another(add_flag));
        }

        static public void Add_room_to_list(string _room_name, string _room_frequency, List<string> _exclusion_list)
        {
            var tuple = new Tuple<string, string, List<string>>(_room_name, _room_frequency, _exclusion_list);
            house_dictionary.Add(_room_name, tuple);
        }
            
        static public string[] Get_room_list_array()
        {
            string[] room_list_array = new string[Get_room_list_count()];
            int i = 0;
            foreach (var room in house_dictionary)
            {
                room_list_array[i] = room.Key;
                i++;
            }

            return room_list_array;
        }

        static public string Print_room_list_array()
        {
            return string.Join(",", Get_room_list_array());
        }

        static public void Get_room_list()
        {
            string room_name;
            string room_frequency;
            List<string> exclusion_list;

            if (house_dictionary.Count > 0)
            {
                int i = 0;
                foreach (var room in house_dictionary)
                {
                    i++;
                    (room_name, room_frequency, exclusion_list) = room.Value;
                    Console.WriteLine("{0}. {1}", i, room_name);
                }
            }
            else
            {
                string _user_input = Menu.Nothing_returned_add_something("rooms");               

                if (_user_input.Equals("Y", StringComparison.OrdinalIgnoreCase))
                {
                    Add_room();
                }
                else
                {
                    Menu.Main_menu();
                }
            }
        }

        static public int Get_room_list_count()
        {
            return house_dictionary.Count;
        }

        static public string House_nothing_returned()
        {
            string _user_input = Menu.Nothing_returned_add_something("rooms");
            if (_user_input.Equals("Y", StringComparison.OrdinalIgnoreCase))
            {
                House.Add_room();
            }

            return _user_input;
        }

        public static (string, string, List<string>) Get_room(string _input)
        {
            (string room_name, string room_frequency, List<string> exclusion_list) = house_dictionary[_input];

            return (room_name, room_frequency, exclusion_list);
        }

        public static string[] Get_room_frequency()
        {
            string room_name;
            string room_frequency;
            List<string> exclusion_list;
            int i = 0;
            string[] room_frequency_array = new string[house_dictionary.Count];

            foreach (var room in house_dictionary)
            {
                (room_name, room_frequency, exclusion_list) = room.Value;
                room_frequency_array[i] = room_frequency;
                i++;
            }

            return room_frequency_array;
        }

        public static void Add_cleaner_to_exemption_list(string _cleaner, string _room_name)
        {
            (string room_name, string room_frequency, List<string> _exclusion_list) = Get_room(_room_name);
            _exclusion_list.Add(_cleaner);
            var tuple = new Tuple<string, string, List<string>>(_room_name, room_frequency, _exclusion_list);

            house_dictionary[_room_name] = tuple;
        }

        public static void Remove_cleaner_from_exemption_list(string _cleaner_name, string _room_name)
        {
            (string room_name, string room_frequency, List<string> exclusion_list) = Get_room(_room_name);
            exclusion_list.Remove(_cleaner_name);
            var tuple = new Tuple<string, string, List<string>>(_room_name, room_frequency, exclusion_list);

            house_dictionary[_room_name] = tuple;
        }
    }
}
