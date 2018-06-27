using System;
using System.Collections.Generic;

namespace cleaning_rota
{
    static public class House
    {

        //static List<string> room_list;
        //static Dictionary<string, List<string>> room_dictionary = new Dictionary<string, List<string>>();

        static Dictionary<string, Tuple<string, string>> house_dictionary = new Dictionary<string, Tuple<string, string>>();
        

        //static public int room_count
        //{
        //    get
        //    {
        //        return room_count;
        //    }
        //    set
        //    {                     
        //        if (Int32.TryParse(value, out int converted_to_int))
        //        {
        //            room_count = converted_to_int;
        //        }
        //        else
        //        {
        //            throw new System.ArgumentException("Value needs to be a whole number.");
        //        }
        //    }            
        //}

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
Console.Write(
@"How frequently should {0} be cleaned?
1. Monthly
2. Semi-monthly
3. Thrice-monthly
4. Weekly
{1}", _room_name, Constants.select);

                        _room_frequency = Console.ReadLine() ?? String.Empty;
                        (number_validation_flag, _room_frequency_converted) = User_input_verification.Number_validation(_room_frequency);
                    } while (number_validation_flag);
                } while (User_input_verification.Number_range(_room_frequency_converted, 4));

                Add_room_to_list(_room_name, _room_frequency);

            } while (Menu.Add_another(add_flag));

            //static public void Set_room_frequency(String _input)
            //{
            //    if (int.TryParse(_input, out int output))
            //    {
            //        room_list.Add(_input);
            //    }
            //    else
            //    {
            //        throw new System.ArgumentException("Value needs to be a number.");
            //    }
            //}
        }

        static public void Add_room_to_list(string _room_name, string _room_frequency)
        {
            String room_name = _room_name;
            String _room_frequency2 = _room_frequency;

            var tuple = new Tuple<string, string>(room_name, _room_frequency2);
            house_dictionary.Add(_room_name, tuple);
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
            }
        }

        public static (string, string) Get_room(String _input)
        {
            //Console.WriteLine(room_dictionary.TryGetValue(_input, out Tuple<string, string> tuple));
            //Console.WriteLine("{0} - {1} - {2}", tuple.Item1, tuple.Item2, tuple.Item3.ToString());
            //String output = room_dictionary.TryGetValue(_input, out Tuple<string, string> tuple);

            (string room_name, string room_frequency) = house_dictionary[_input];

            return (room_name, room_frequency);
        }

        //foreach (KeyValuePair<string, Int16> author in AuthorList)
        //{

        //    Console.WriteLine("Key: {0}, Value: {1}",
        //        author.Key, author.Value);
        //}



    //static public void Set_room_frequency(String _input)
    //{
    //    if (int.TryParse(_input, out int output))
    //    {
    //        room_list.Add(_input);
    //    }
    //    else
    //    {
    //        throw new System.ArgumentException("Value needs to be a number.");
    //    }                
    //}

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
