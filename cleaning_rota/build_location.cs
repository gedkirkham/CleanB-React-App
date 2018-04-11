using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    public class Build_location
    {
        LinkedList<String> room_list = new LinkedList<String>();
        private int room_count_value;
        private String room_name;

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
            room_list.AddLast(_input);
        }

        public void Get_room_list()//improve. Writing directly to console is not good.
        {
            foreach (var value in room_list)
            {
                Console.WriteLine(value);
            }
        }
    }
}
