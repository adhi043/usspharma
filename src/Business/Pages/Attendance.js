
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, TextInput, Dimensions, ScrollView } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import tw from "twrnc";
import ArrowLongLeftIcon from "react-native-heroicons/outline/ArrowLongLeftIcon";
import TrashIcon from "react-native-heroicons/outline/TrashIcon";
import MinusIcon from "react-native-heroicons/solid/MinusIcon";
import HeartIcon from "react-native-heroicons/solid/HeartIcon";
import XMarkIcon from "react-native-heroicons/solid/XMarkIcon";
import MapPinIcon from "react-native-heroicons/solid/MapPinIcon";
import PlusCircleIcon from "react-native-heroicons/solid/PlusCircleIcon";
import Modal from "react-native-modal";
import CalendarDaysIconS from "react-native-heroicons/solid/CalendarDaysIcon";
import MagnifyingGlassIconS from "react-native-heroicons/solid/MagnifyingGlassIcon";
import CalendarPicker from "react-native-calendar-picker";
import { useState } from "react";



const Attendance = ({ navigation }) => {

  const { width, height } = Dimensions.get('screen')
  const [show, setShow] = useState(false)


  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  const minDate = new Date(); // Today
  const maxDate = new Date(2017, 6, 3);
  const startDate = selectedStartDate ? selectedStartDate.toString() : "";
  const endDate = selectedEndDate ? selectedEndDate.toString() : "";


  return (<>


    <ScrollView style={{ backgroundColor: Color.background }} showsVerticalScrollIndicator={false}>
      <View style={{ padding: 20 }}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <View>
            <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: '800' }}>Attendance</Text>
          </View>
          <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20, flexDirection: 'row', width: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }]} onPress={() => { setShow(true) }}>
            <CalendarDaysIconS size={18} color={Color.white} />
          </TouchableOpacity>
        </View>




        <View style={{ marginVertical: 10 }}>
          <View style={{ padding: 15, borderRadius: 20, width: '100%', elevation: 5, backgroundColor: Color.white }}>



            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} onPress={() => { navigation.navigate('Sellers') }}>
                <View>
                  <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>02-02-2024</Text>
                  <Text style={{ color: Color.gray2, fontSize: FontSize.font_size }}>9:15 AM - 7:15 PM</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorMediumseagreen, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 70 }]}>
                <Text style={{ color: Color.white, fontSize: FontSize.font1_size }}>Present</Text>
              </TouchableOpacity>
            </View>



          </View>
        </View>




        <View style={{ marginBottom: 10 }}>
          <View style={{ padding: 15, borderRadius: 20, width: '100%', elevation: 5, backgroundColor: Color.white }}>



            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} onPress={() => { navigation.navigate('Sellers') }}>
                <View>
                  <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>02-02-2024</Text>
                  <Text style={{ color: Color.gray2, fontSize: FontSize.font_size }}>Not In - Not Out</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.danger, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 70 }]}>
                <Text style={{ color: Color.white, fontSize: FontSize.font1_size, }}>Absent</Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>





      </View>
    </ScrollView>





    <Modal isVisible={show} style={{ width: '100%', margin: 0 }}  >
      <View style={{ backgroundColor: Color.white, borderRadius: 20, padding: 20, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>

        <TouchableOpacity style={[tw`flex-row gap-x-3 items-center`, { position: 'absolute', top: 10, right: 10 }]} onPress={() => { setShow(false) }}>
          <XMarkIcon size={18} color={Color.gray2} />
        </TouchableOpacity>
        <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.primary, borderRadius: 20 }]}>
          <CalendarDaysIconS size={25} color={Color.white} />
        </TouchableOpacity>
        <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: '800' }}>Calendar</Text>


        <View style={{ paddingHorizontal: 20 }}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            todayBackgroundColor={Color.colorMediumseagreen}
            selectedDayColor={Color.background2}
            selectedDayTextColor="#000"
            onDateChange={onDateChange}

          />
        </View>


      </View>
    </Modal>





  </>
  );
};
export default Attendance;
