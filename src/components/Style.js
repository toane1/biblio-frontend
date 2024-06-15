import {StyleSheet} from "react-native";

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
  paragraph_italic: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  error:{
    color: 'red',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#42a83e',
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    height: 40,
    marginBottom: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
   containerHorizontal:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  plantCard: {
    elevation: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  plantImage: {
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  plantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  plantCare: {
    fontSize: 14,
    color: '#666',
  },
});