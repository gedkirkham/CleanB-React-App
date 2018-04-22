using System;
using System.Collections.Generic;

namespace cleaning_rota
{
    public class Build_location
    {
        private int room_count_value;
        private String room_name;

        List<string> room_list;
        Dictionary<string, List<string>> room_dictionary = new Dictionary<string, List<string>>();

        public void Set_room_count(String _input)
        {
            if (Int32.TryParse(_input, out int converted_to_int))
            {
                this.room_count_value = converted_to_int;
            }
            else
            {
                throw new System.ArgumentException("Value needs to be a whole number.");
            }
        }

        public int Get_room_count()
        {
            return this.room_count_value;
        }

        public void Set_room_name(String _input)//add some error checking i.e. character count
        {
            String room_name = _input;

            room_list = new List<string>();
            room_dictionary.Add(_input, room_list);
        }

        public void Get_room_list()//improve. Writing directly to console is not good.
        {
            Console.WriteLine(room_dictionary.Keys);
        }

        public void Set_room_frequency(String _input)
        {
            if (int.TryParse(_input, out int output))
            {
                room_list.Add(_input);
            }
            else
            {
                throw new System.ArgumentException("Value needs to be a number.");
            }                
        }
    }
}
