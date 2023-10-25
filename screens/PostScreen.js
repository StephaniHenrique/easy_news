import { View, Button, Text } from 'react-native'
import React, { useRef } from 'react'
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from 'expo-status-bar'



export default function PostScreen() {
  const BottomSheetModalRef = useRef(null);
  const snapPoints = ["25%", "48%", "75%"];

  function handlePresentModal() {
    BottomSheetModalRef.current?.present();
  }
  return (
    <BottomSheetModalProvider>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50%', flex: 1, marginTop: 20 }}>
        <Button title="teste" onPress={handlePresentModal} />
        <StatusBar style='auto' />
        <BottomSheetModal
          ref={BottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 20 }}
        >
          <View>
            <Text>Oi tudo ebeeem</Text>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}