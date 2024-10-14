const CheckMarkForm = ({ value, setValue, conditional }) => {
  return (
    <View className="flex flex-row  items-center mb-4">
      <TouchableOpacity
        onPress={() => {
          setValue(conditional);
        }}
        className={`h-8 w-8 p-2 rounded-lg mr-3 ${
          value === conditional ? `bg-[${Colors.primary}]` : "bg-white border"
        }`}
      >
        {value === conditional && (
          <Image source={check} className="w-full h-full" />
        )}
      </TouchableOpacity>

      <GaramondText className="text-lg ">{conditional}</GaramondText>
    </View>
  );
};

export default CheckMarkForm;
