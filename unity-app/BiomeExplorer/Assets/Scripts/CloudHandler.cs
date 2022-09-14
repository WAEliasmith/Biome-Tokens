using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;

public class CloudHandler : MonoBehaviour
{
  public int gensize = 30;

  public GameObject player = null;

  public Tile floorTile;
  public Tilemap Floor;

  public GameObject CloudMap;

  public float cloudSpeed = 0.05f;

  public float smoothness = 35;

  public float time = 0;

  void FixedUpdate()
  {
    CloudMap.transform.position += new Vector3(cloudSpeed,2*cloudSpeed,0);
    time += 0.01f;

    //place nearby tiles
    for (int i = -gensize; i <= gensize; i++){
      for (int j = -gensize; j <= gensize; j++){
        float a = Mathf.PerlinNoise(((player.transform.position.x*4-CloudMap.transform.position.x*4)+i)/smoothness+1000,(player.transform.position.y*4-CloudMap.transform.position.y*4+j)/smoothness-10000);
        float b = 1;
        //float b = Mathf.PerlinNoise(((player.transform.position.x*4-CloudMap.transform.position.x*4-time)+i)/smoothness+100,(player.transform.position.y*4-CloudMap.transform.position.y+time+j)/smoothness-100);

        if(b*a > 0.6){
          changeFloor(player.transform.position*4-CloudMap.transform.position*4 + new Vector3(i, j, 0), floorTile, true);
        } 
        
            
      }
    }
    

    //remove far away tiles
    for (int i = -2*gensize; i <= 2*gensize; i++){
      if(i == -2*gensize || i == 2*gensize){
        for (int j = -2*gensize+1; j <= (2*gensize-1); j++){
          changeFloor(player.transform.position*4-CloudMap.transform.position*4 + new Vector3(i, j, 0), null);
          changeFloor(player.transform.position*4-CloudMap.transform.position*4 + new Vector3(i+1, j+1, 0), null);
        }
      }
      changeFloor(player.transform.position*4-CloudMap.transform.position*4 + new Vector3(i, -2*gensize, 0), null);
      changeFloor(player.transform.position*4-CloudMap.transform.position*4 + new Vector3(i, 2*gensize, 0), null);
      changeFloor(player.transform.position*4-CloudMap.transform.position*4 + new Vector3(i+1, 2*gensize+1, 0), null);

    }
  }

  public void changeFloor(Vector3 position3d, Tile wallType = null, bool replace = false, float H = 0, float S = 0, bool white = false)
  {
    Vector3Int position = Vector3Int.FloorToInt(position3d);
    if(replace == false || Floor.GetTile(position) == null){
      Floor.SetTile(position, wallType);
    }
  }
}
