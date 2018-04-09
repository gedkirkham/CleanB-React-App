using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    public class build_location
    {
        private int room_count_value;

        public int set_room_count(String _input)
        {
            int room_count_value = 0;
            int converted_to_int;

            if (Int32.TryParse(_input, out converted_to_int))
            {
                this.room_count_value = converted_to_int;
            }
            else
            {
                throw new System.ArgumentException("Value needs to be a whole number.");
            }

            return room_count_value;
        }

        public int get_room_count()
        {
            return this.room_count_value;
        }
    }
}
