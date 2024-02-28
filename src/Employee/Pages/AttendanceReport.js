
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, TextInput, Dimensions, ScrollView } from "react-native";
import { Color, FontSize, baseUrl } from "../../GlobalStyles";
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
import { useCallback, useRef, useState } from "react";
import Noti from "../../Noti";
import Loader from "../../Loader";
import axios from "axios";
import moment from "moment";
import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";



const AttendanceReport = ({ navigation }) => {

  const [data, setData] = useState(false)

  const { width, height } = Dimensions.get('screen')
  const [report, setReport] = useState([])
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sel, setSel] = useState('All')



  const showToast = (type, head,body) => {
    Toast.show({
        type: type,
        text1: head,
        text2: body,
    });
}





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





  useFocusEffect(
    useCallback(async () => {
      setLoading(true)
      const mydata = JSON.parse(await AsyncStorage.getItem('data'))



      axios.get(`${baseUrl}/employe/get/${mydata?.id}`).then(res => {
        if (res.data.status === 'ok') {
          setData(res.data.data);
          setLoading(false)
        }
      }).catch(err => {
        showToast('error','Error', err.message)
        setLoading(false)
      })

    }, [])
  )




  const submitReport = () => {
    setLoading(true)
    if (!startDate) {
      showToast('error','Error', 'Please select start date')
      setLoading(false)
    } else {


      const param = {
        employeId: data?.id,
        startDate: startDate,
        endDate: endDate,
      }

      axios.post(`${baseUrl}/employeAttend/filter`, param).then(res => {
        if (res.data.status === 'ok') {
          setReport(res.data.data)
          setShow(false)
          setLoading(false)
        }
        else if (res.data.status === 'fail') {
          showToast('error','Error', res.data.message)
          setLoading(false)
        }
      }).catch(err => {
        showToast('error','Error', err.message)
        setLoading(false)
      })
    }
  }





  return (<>

    

{loading ? <Loader /> : null}
    <View style={{ backgroundColor: Color.background, flex: 1,width:'100%',height:'100%' }} >
      <View style={{ padding: 20, paddingTop: 40, paddingHorizontal: 10 }}>

        <View style={{ width: 270, height: 270, borderRadius: 200, backgroundColor: Color.background2, position: 'absolute', left: -50, top: -50, zIndex: -1 }} />

        <View style={[tw`flex-row justify-between items-center mb-1`, { paddingBottom: 10 }]}>
          <View style={tw`flex-row justify-between items-center gap-x-3`}>
            <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
              navigation.goBack()
            }}>
              <ArrowLongLeftIcon size={25} color={Color.white} />
            </TouchableOpacity>
            <View>
              <Text style={{ color: Color.white, fontSize: FontSize.headline3_size, fontWeight: '800' }}>Attendance Report</Text>
            </View>

          </View>
          <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20, flexDirection: 'row', width: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }]} onPress={() => { setShow(true) }}>
            <CalendarDaysIconS size={18} color={Color.white} />
          </TouchableOpacity>

        </View>



        <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 30 }}>

          <TouchableOpacity style={[tw`p-2`, { backgroundColor: sel === 'All' ? Color.white : Color.background2, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, borderColor: Color.white, borderWidth: 1 }]} onPress={() => {
            setSel('All')
          }}>
            <Text style={{ color: sel === 'All' ? Color.black : Color.white, fontSize: FontSize.font1_size }}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[tw`p-2`, { backgroundColor: sel === 'Present' ? Color.colorMediumseagreen : Color.background2, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, borderColor: Color.white, borderWidth: 1 }]} onPress={() => {
            setSel('Present')
          }}>
            <Text style={{ color: sel === 'Present' ? Color.white : Color.white, fontSize: FontSize.font1_size }}>Present</Text>
          </TouchableOpacity>


          <TouchableOpacity style={[tw`p-2`, { backgroundColor: sel === 'Absent' ? Color.error : Color.background2, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, borderColor: Color.white, borderWidth: 1 }]} onPress={() => {
            setSel('Absent')
          }}>
            <Text style={{ color: sel === 'Absent' ? Color.white : Color.white, fontSize: FontSize.font1_size }}>Absent</Text>
          </TouchableOpacity>


        </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:120}} >
            {report.length > 0 ? report.filter((item) => {
              if (sel === "All") return true;
              if (sel === "Present") return item.inDateTime !== null;
              if (sel === "Absent") return item.inDateTime === null;
              return true;
            }).map(i => {
              return (<>

                <View style={{ marginVertical: 5, marginHorizontal: 10 }}>
                  <View style={{ padding: 15, borderRadius: 20, width: '100%', elevation: 5, backgroundColor: Color.white }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                      <View style={{ width: '70%' }}>
                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '600' }}>
                          📅 {moment(i?.createdAt).format('YYYY-MM-DD')}
                        </Text>

                        <Text style={{ color: Color.gray2, fontSize: FontSize.font_size, fontWeight: 'bold' }}>
                          ⏰ Check In:
                          <Text style={{ color: Color.gray2, fontSize: FontSize.font_size, fontWeight: '400' }}>
                            {i?.inDateTime ? moment(i?.inDateTime).format('HH:mm:ss A') : 'Not Check In'}
                          </Text>
                        </Text>

                        <Text style={{ color: Color.gray2, fontSize: FontSize.font_size, fontWeight: 'bold' }}>
                          ⏰ Check Out:
                          <Text style={{ color: Color.gray2, fontSize: FontSize.font_size, fontWeight: '400' }}>
                            {i?.outDateTime ? moment(i?.outDateTime).format('HH:mm:ss A') : 'Not Check Out'}
                          </Text>
                        </Text>

                        {i?.lateComingReason ?
                          <Text style={{ color: Color.gray2, fontSize: FontSize.font_size, fontWeight: 'bold' }}>
                            🙄 Availability:
                            <Text style={{ color: Color.error, fontSize: FontSize.font_size, fontWeight: '400' }}>
                              {i?.lateComingReason ? 'Late' : 'Not Check Out'}
                            </Text>
                          </Text>
                          : null}

                        {i?.lateComingReason ?
                          <Text style={{ color: Color.gray2, fontSize: FontSize.font_size, fontWeight: 'bold' }}>
                            🙄 Late Coming Reason:
                            <Text style={{ color: Color.gray2, fontSize: FontSize.font_size, fontWeight: '400' }}>
                              {i?.lateComingReason}
                            </Text>
                          </Text>
                          : null}

                        {i?.extraWorkperDay ?
                          <Text style={{ color: Color.gray2, fontSize: FontSize.font_size, fontWeight: 'bold' }}>
                            ⏰ Extra Work timing:
                            <Text style={{ color: Color.gray2, fontSize: FontSize.font_size, fontWeight: '400' }}>
                              {i?.extraWorkperDay}
                            </Text>
                          </Text>
                          : null}

                        {i?.extraWorkReason ?
                          <Text style={{ color: Color.gray2, fontSize: FontSize.font_size, fontWeight: 'bold' }}>
                            ⏰ Extra Work Reason:
                            <Text style={{ color: Color.gray2, fontSize: FontSize.font_size, fontWeight: '400' }}>
                              {i?.extraWorkReason}
                            </Text>
                          </Text>
                          : null}
                      </View>

                      <TouchableOpacity style={[tw`p-2`, { backgroundColor: i?.inDateTime ? Color.colorMediumseagreen : Color.danger, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 70 }]}>
                        <Text style={{ color: Color.white, fontSize: FontSize.font1_size }}>{i?.inDateTime ? 'Present' : 'Absent'}</Text>
                      </TouchableOpacity>
                    </View>



                  </View>
                </View>

              </>)
            })
              :
              <View style={{}}>
                <LottieView source={require('../../assets/8JBcl1otYp.json')} autoPlay loop style={{ width: width, height: height * 0.6 }} />
                <Text style={{ color: Color.background2, fontSize: FontSize.pxRegular_size, textAlign: 'center' }}>No data found!</Text>

              </View>
            }



          </ScrollView>

      </View>
    </View>





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
            minDate={data?.createdAt}
            maxDate={new Date()}

          />
        </View>


        <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20, flexDirection: 'row', width: '95%', justifyContent: 'center', alignItems: 'center' }]} onPress={() => {
          submitReport()
        }}>
          <Text style={{ color: Color.white, fontSize: FontSize.font_size }}>Submit</Text>
        </TouchableOpacity>



      </View>
    </Modal>





  </>
  );
};
export default AttendanceReport;
