<template>
  <div>
    <div v-if="spacesReserves.length!==0">
      <h3 class="black--text pl-0 pt-8">
        Lista de Reservas do Espaço:
      </h3>
    </div>

    <div class="black--text pl-0 pt-3">
      <v-card
        width="1400px" 
        class="mx-auto"
      >
        <div v-if="spacesReserves.length==0">
          <v-card-title
            v-text='spacesReserves.length==0 ? "Espaço não possuí reservas" : ""'
          >
          </v-card-title>
        </div>

        <template v-for="(reserve, index) in spacesReserves">
          <v-list :key="reserve.id" disabled="true">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  v-text="reserve.justification"
                >
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
              <div v-if="reserve.normal">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-calendar
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Data da Reserva:
                    </v-list-item-title>
                    <v-list-item-subtitle 
                      v-text="reserve.dateStart"
                    >
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
              <div v-else>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-calendar
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content >
                    <v-list-item-title>
                      Data Inicio:
                    </v-list-item-title>
                    <v-list-item-subtitle 
                      v-text="reserve.dateStart"
                    >
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-calendar
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content >
                    <v-list-item-title>
                      Data Fim:
                    </v-list-item-title>
                    <v-list-item-subtitle 
                      v-text="reserve.dateEnd"
                    >
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-clock-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Horário
                </v-list-item-title>
                <v-list-item-subtitle 
                  v-text="reserve.schedule"
                >
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-btn
              @click="sendToDetail('detail-reserve',reserve)"
              :key="reserve.id"
              tile
              dark
              color="indigo"
            >
              <v-icon left>
                mdi-plus
              </v-icon>
              Detalhes
            </v-btn>

            <v-divider 
              v-if="index < spacesReserves.length - 1"
              :key="index">
            </v-divider>
        </template>
      </v-card>
    </div>
  </div>
</template>

<script>
import axiosConf from "../services/config";

export default {
  props: ["space_id"],
  data: () => ({
    spacesReserves: [],
  }),
  async created() {
    const result = await axiosConf.get("space-reservations", {
      params: { spaceId: this.space_id },
    });
    this.spacesReserves = result.data;
  },
  methods: {
    async detailReserve(id) {
      this.$router.push('detail-reserve', id);
    },
    navegateTo(where) {
      this.$router.push({ name: where });
    },

    sendToDetail(where, data) {
      this.$router.push({ name: where, params: { reserve: data } });
    }
  }
};
</script>

<style>
</style>