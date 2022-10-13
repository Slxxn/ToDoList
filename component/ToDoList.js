import { StyleSheet, Text, View,FlatList} from 'react-native'
import React,{useState} from 'react'
import { Input, ListItem,Button,SpeedDial } from "@rneui/themed";
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import DialogInput from 'react-native-dialog-input';

const initTask = [


]

const ToDoList = () => {

    const [open, setOpen] = React.useState(false);
    const [openDial, setOpenDial] = React.useState(false);
    const [ getText, setText ] = useState("");
    const [getTask, setTask] = useState(initTask) 

    const Swipe = ({tache,id}) => {

        return (
          <View style={{padding:10, marginTop:20}}>
            <ListItem.Swipeable style={styles.Card} containerStyle={{borderRadius:30}}
              
                    //Boutton droit
                //rightWidth={50}
                rightStyle={{width:180}}
                leftStyle={{width:180}}
                leftContent={(reset) => (
                  <Button
                      title="Modifier"
                      onPress={() => supprimer(id)}
                      icon={{ name: 'edit', color: 'white' }}
                      buttonStyle={{ height: '100%', backgroundColor: 'green', borderBottomLeftRadius:30, borderTopLeftRadius:30,justifyContent:'flex-start',paddingHorizontal:10 }}
                />
              )}
                rightContent={(reset) => (
                  <Button
                      title="Supprimer"
                      onPress={() => supprimer(id)}
                      icon={{ name: 'delete', color: 'white' }}
                      buttonStyle={{ height: '100%', backgroundColor: 'red', borderBottomRightRadius:30, borderTopRightRadius:30,justifyContent:'flex-end',paddingHorizontal:10 }}
                />
              )}
              >
              <Icon name='adjust' type='material'/> 
              <Text style={{color:'black', fontSize:17}}>{id}</Text>
              <ListItem.Content>
                  <ListItem.Title>{tache}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
              </ListItem.Swipeable>
          </View>
        )
      }

    const textChange = (textValue) => { 

            //Maj de la valeur du text
        console.log("Texte input", textValue)
        setText(textValue)

     }

    const ajouter = (textValue) => { 

        //Fonction nfn pour ajouter avec un bouttons

        console.log("Texte input", getText)
        setTask([...getTask,

            {id:getTask.length+1,
            tache:textValue}  
        ])
     }

    const supprimer = (id) => { 

        //Fonction nfn pour supprimer avec un bouttons

        console.log("Delete Task", id)
            getTask.findIndex

        const filterTask = getTask.filter(item => item.id != id)
           
            console.log(filterTask)
            setTask(filterTask)
        


     }

        
    const HeaderTodo = () => { 

        //barre de saisie

        return(

          <Input
        placeholder='INPUT WITH ICON'
        rightIcon={

            <Icon   
                onPress={ajouter} 
                name='login' 
                type='material'
            />

        }
        onChangeText={textChange}
        value={getText}
      />  
        )
     }

    const Swipeable = () => { 
        return(
            <Swipe/>
        )
    }
    

    return (

        <SafeAreaView>

            <FlatList
                data={getTask}
                renderItem={ ({item}) => <Swipe tache={item.tache} id={item.id}/> }
                keyExtractor={item => item.id}
                ListEmptyComponent={()=> (

                    <Text style={styles.listeVide}>Oups...On dirait que vous n'avez plus de taches</Text>

                )}
                
            />

            <DialogInput isDialogVisible={openDial}
                        title={"Ajouter une tâche"}
                        //message={"Message pour DialogInput #1"}
                        hintInput ={"Votre tâche ici"}
                        submitInput={ (inputText) => {ajouter(inputText)} }
                        closeDialog={ () => setOpenDial(!openDial)}>
            </DialogInput>

            <SpeedDial

                style={styles.FloatButton}
                placement={"right"}
                isOpen={open}
                icon={{ name:'chat',type:'material', color: '#fff'} }
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpenDial(!openDial)}
                onClose={() => setOpen(!open)}
            >
            
            </SpeedDial>

        </SafeAreaView>
    )
}

export default ToDoList

const styles = StyleSheet.create({

    listeVide:{
        fontSize:25,
        color:"#2CB9AC", 
        alignSelf:'center',
        textShadowRadius:3,
        marginTop:170,
        marginHorizontal:5,
        
    },

    FloatButton:{
        position:'absolute',
        top:655,

        /* padding:10,
        ,
        bottom:-105, */
    },

    Card:{
        borderStyle:'solid',
        borderWidth:2,
        borderRadius:30,
        width:'auto',

    }

})