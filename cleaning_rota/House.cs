using System;
using System.Collections.Generic;

namespace cleaning_rota
{
    static public class House
    {

        //static List<string> room_list;
        //static Dictionary<string, List<string>> room_dictionary = new Dictionary<string, List<string>>();

        static Dictionary<string, Tuple<string, string>> house_dictionary = new Dictionary<string, Tuple<string, string>>();
        
        static public void Add_room()
        {
            bool add_flag = false;
            do
            {
                Console.WriteLine();
                Console.Write("Name: ");
                string _room_name = Console.ReadLine() ?? String.Empty; //add some error checking i.e. character count

                string _room_frequency;
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
                } while (User_input_verification.Number_range(_room_frequency_converted, 4));

                Add_room_to_list(_room_name, _room_frequency);

            } while (Menu.Add_another(add_flag));
        }

        static public void Add_room_to_list(string _room_name, string _room_frequency)
        {
            var tuple = new Tuple<string, string>(_room_name, _room_frequency);
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

            if (house_dictionary.Count > 0)
            {
                int i = 0;
                foreach (var room in house_dictionary)
                {
                    i++;
                    (room_name, room_frequency) = room.Value;
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

        public static (string, string) Get_room(String _input)
        {
            (string room_name, string room_frequency) = house_dictionary[_input];

            return (room_name, room_frequency);
        }

        public static string[] Get_room_frequency()
        {
            string room_name;
            string room_frequency;
            int i = 0;
            string[] room_frequency_array = new string[house_dictionary.Count];

            foreach (var room in house_dictionary)
            {
                (room_name, room_frequency) = room.Value;
                room_frequency_array[i] = room_frequency;
                i++;
            }

            return room_frequency_array;
        }

        internal static bool print_list()
        {
            throw new NotImplementedException();
        }

        internal static bool validate_room(string v)
        {
            throw new NotImplementedException();
        }
    }
}
