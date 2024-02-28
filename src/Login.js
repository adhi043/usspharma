
import { View, Text, Pressable, TouchableOpacity, StatusBar, Image, Dimensions, ScrollView, TextInput } from "react-native";
import { Color, FontSize, baseUrl } from "./GlobalStyles";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import UserCircleIcon from "react-native-heroicons/solid/UserCircleIcon";
import LockClosedIcon from "react-native-heroicons/solid/LockClosedIcon";
import EyeIcon from "react-native-heroicons/solid/EyeIcon";
import EyeSlashIcon from "react-native-heroicons/solid/EyeSlashIcon";
import Noti from "./Noti";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./Loader";

const Login = ({ navigation }) => {

  const { width, height } = Dimensions.get('screen')
  const [hide, setHide] = useState(true)
  const [loading, setLoading] = useState(false)
  const [sel, setSel] = useState('Admin')
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [type, setType] = useState(null);
  const [msg, setMsg] = useState(null);
  const toastRef = useRef(null);

  const handleShowToast = () => {
    if (toastRef.current) {
      toastRef.current.show();
    }
  };



  const storedata = async (data,login) => {
    try {
        await AsyncStorage.setItem("data", JSON.stringify(data));
        await AsyncStorage.setItem("login", JSON.stringify(login));
    } catch (error) {
        console.log(error);
    }
};





  const submit = () => {
    setLoading(true)
    if (!email) {
      setType('Error');
      setMsg('Must Enter Email!');
      handleShowToast()
      setLoading(false)
    }
    else if (!password) {
      setType('Error');
      setMsg('Must Enter Password!');
      handleShowToast()
      setLoading(false)
    }
    else {

      const param={
        email:email,
        password:password,
        internet:true,
      }



      axios.post(`${baseUrl}/login/${sel==='Admin'?'business':'employe'}`,param).then(res => {
        if (res.data.status === 'ok') {
          setType('Success');
          setMsg(res.data.message);
          storedata(res.data.data,sel)
          handleShowToast()
          setLoading(false)
          sel==='Admin'?navigation.navigate('Business'):navigation.navigate('Employee')
        }
        else if (res.data.status === 'fail') {
          setType('Error');
          setMsg(res.data.message);
          handleShowToast()
          setLoading(false)
        }
      }).catch(err => {
        setType('Error');
        setMsg(err.message);
        handleShowToast()
        setLoading(false)
      })
    }
  }






  return (
    <>
      {loading?<Loader/>:null}
      <Noti type={type} msg={msg} timeout={2000} ref={toastRef} />
      <View style={{ backgroundColor: Color.background, flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ width: 270, height: 270, borderRadius: 200, backgroundColor: Color.background2, position: 'absolute', left: -50, top: -50, zIndex: -1 }} />
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <View style={{ padding: 20, }}>


            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
              <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20, width: 67, elevation: 5 }]}>
                <UserCircleIcon size={45} color={Color.white} />
              </TouchableOpacity>
              <Text style={{ color: Color.black, fontSize: FontSize.headline2_size, fontWeight: '800' }}>Pharmacy Login</Text>
            </View>


            <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 10, }}>

              <TouchableOpacity style={[tw`p-2`, { backgroundColor: sel === 'Admin' ? Color.background2 : Color.white, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, borderColor: Color.white, borderWidth: 1 }]} onPress={() => {
                setSel('Admin')
              }}>
                <Text style={{ color: sel === 'Admin' ? Color.white : Color.black, fontSize: FontSize.font1_size }}>Admin</Text>
              </TouchableOpacity>


              <TouchableOpacity style={[tw`p-2`, { backgroundColor: sel === 'Employe' ? Color.background2 : Color.white, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, borderColor: Color.white, borderWidth: 1 }]} onPress={() => {
                setSel('Employe')
              }}>
                <Text style={{ color: sel === 'Employe' ? Color.white : Color.black, fontSize: FontSize.font1_size }}>Employe</Text>
              </TouchableOpacity>


            </View>



            <View>

              <View style={{ padding: 5, backgroundColor: Color.white, elevation: 5, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.background2, borderRadius: 20, elevation: 5 }]}>
                  <UserCircleIcon size={25} color={Color.white} />
                </TouchableOpacity>
                <TextInput style={{ width: '80%', padding: 0, color: Color.black }} placeholder="Email" placeholderTextColor={Color.colorGray_100} defaultValue={email} onChangeText={(value) => { setEmail(value) }} />

              </View>




              <View style={{ padding: 5, backgroundColor: Color.white, elevation: 5, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.background2, borderRadius: 20, elevation: 5 }]}>
                  <LockClosedIcon size={25} color={Color.white} />
                </TouchableOpacity>
                <TextInput style={{ width: '66%', padding: 0, color: Color.black }} placeholder="Password" placeholderTextColor={Color.colorGray_100} defaultValue={password} onChangeText={(value) => { setPassword(value) }} secureTextEntry={hide} />
                <TouchableOpacity style={[tw`p-2`, { borderRadius: 20,  }]} onPress={() => { setHide(!hide) }}>
                  {hide?<EyeSlashIcon size={25} color={Color.colorGray_100} />:<EyeIcon size={25} color={Color.colorGray_100} />}
                </TouchableOpacity>
              </View>





              <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 50 }]} onPress={() => { submit() }}>

                <Text style={{ color: Color.white, fontSize: FontSize.pxRegular_size, fontWeight: '600' }}>Login</Text>

              </TouchableOpacity>





            </View>


          </View>
        </ScrollView>

      </View>
    </>
  );
};
export default Login;
