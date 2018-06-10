using System;
using System.Collections.Generic;

namespace cleaning_rota
{
    static public class Build_location
    {

        //static List<string> room_list;
        //static Dictionary<string, List<string>> room_dictionary = new Dictionary<string, List<string>>();

        static Dictionary<string, Tuple<string, string>> room_dictionary = new Dictionary<string, Tuple<string, string>>();
        

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

        static public void Set_room(String _room_name, String _room_frequency)//add some error checking i.e. character count
        {
            String room_name = _room_name;
            String _room_frequency2 = _room_frequency;

            var tuple = new Tuple<string, string>(room_name, _room_frequency2);
            room_dictionary.Add(_room_name, tuple);

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

        static public void Get_room_list()
        {
            string room_name = "default";
            string room_frequency = "default";

            int i = 0;
            foreach (var item in room_dictionary)
            {
                i++;
                (room_name, room_frequency) = item.Value;
                Console.WriteLine(i + ". " + room_name);
                //Console.Write("{1}" + ". " + "{2}", i, room_name);

                //return (room_name, room_frequency);
            }

            //return (room_name, room_frequency);
        }

        public static (string, string) Get_room(String _input)
        {
            //Console.WriteLine(room_dictionary.TryGetValue(_input, out Tuple<string, string> tuple));
            //Console.WriteLine("{0} - {1} - {2}", tuple.Item1, tuple.Item2, tuple.Item3.ToString());
            //String output = room_dictionary.TryGetValue(_input, out Tuple<string, string> tuple);

            (string room_name, string room_frequency) = room_dictionary[_input];

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
