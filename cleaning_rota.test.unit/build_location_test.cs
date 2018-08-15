//using System;
//using Microsoft.VisualStudio.TestTools.UnitTesting;
//using Program;

//namespace cleaning_rota.test.unit
//{
//    [TestClass]
//    public class build_location_test
//    {
//        private readonly House _build_location = new House();

//        [TestMethod]
//        [ExpectedException(typeof(ArgumentException))]
//        public void Room_count_negative_test()
//        {
//            _build_location.Set_room_count("*");
//        }

//        [TestMethod]
//        public void Number_in_number_out()
//        {
//            _build_location.Set_room_count("4");
//            int result = _build_location.Get_room_count();
//            Assert.Equals(4,result);
//        }

//        [TestMethod]
//        public void String_in_number_out()
//        {
//            _build_location.Set_room_count("Four");
//            int result = _build_location.Get_room_count();
//            Assert.Equals(4, result);
//        }

//        [TestMethod]
//        public void add_room()
//        {
//            String room_name = _build_location.add_room("Room1");
//            Assert.Equals("Room1", room_name);
//        }

//        [TestMethod]
//        public void True_room_frequency()
//        {
//            bool validate_room_frequency = _build_location.validate_room_frequency("2");
//            Assert.Equals(validate_room_frequency, true);
//        }

//        [TestMethod]
//        public void False_room_frequency()
//        {
//            bool validate_room_frequency = _build_location.validate_room_frequency("twoo");
//            Assert.Equals(validate_room_frequency, false);
//        }
//    }
//}