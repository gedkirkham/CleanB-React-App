using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    class build_location
    {
        public int room_count(String _input)
        {
            int room_count_value = 0;
            int converted_to_int;

            if (Int32.TryParse(_input, out converted_to_int))
            {
                result = converted_to_int;
            }
            else
            {
                Exception //throw proper exceltion
            }

            private set {converted_to_int = room_count_value;}
            return room_count_value;
        }

        public int get_room_count()
        {
            return this.room_count_value;
        }
    }
}
